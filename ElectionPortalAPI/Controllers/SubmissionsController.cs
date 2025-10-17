using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectionPortalAPI.Data;
using ElectionPortalAPI.Models;
using System.Text.Json;

namespace ElectionPortalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;

    public SubmissionsController(ApplicationDbContext context, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
    }

    // GET: api/submissions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetSubmissions()
    {
        var submissions = await _context.Submissions
            .Include(s => s.Form)
            .Include(s => s.Customer)
            .ToListAsync();

        return Ok(submissions.Select(s => new
        {
            s.SubmissionId,
            s.FormId,
            FormName = s.Form.Name,
            s.CustomerId,
            CustomerName = s.Customer.Name,
            DataJSON = JsonSerializer.Deserialize<object>(s.DataJSON),
            s.Status,
            s.SubmittedDate,
            s.ApprovedDate
        }));
    }

    // GET: api/submissions/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetSubmission(int id)
    {
        var submission = await _context.Submissions
            .Include(s => s.Form)
            .Include(s => s.Customer)
            .FirstOrDefaultAsync(s => s.SubmissionId == id);

        if (submission == null)
        {
            return NotFound();
        }

        return new
        {
            submission.SubmissionId,
            submission.FormId,
            FormName = submission.Form.Name,
            submission.CustomerId,
            CustomerName = submission.Customer.Name,
            DataJSON = JsonSerializer.Deserialize<object>(submission.DataJSON),
            submission.Status,
            submission.SubmittedDate,
            submission.ApprovedDate
        };
    }

    // POST: api/submissions
    [HttpPost]
    public async Task<ActionResult<object>> CreateSubmission(SubmissionCreateDto dto)
    {
        var submission = new Submission
        {
            FormId = dto.FormId,
            CustomerId = dto.CustomerId,
            DataJSON = JsonSerializer.Serialize(dto.DataJSON),
            Status = SubmissionStatus.Submitted,
            SubmittedDate = DateTime.UtcNow
        };

        _context.Submissions.Add(submission);
        await _context.SaveChangesAsync();

        // Trigger webhook for submission event
        await TriggerWebhook(submission, WebhookEventType.Submitted);

        return CreatedAtAction(nameof(GetSubmission), new { id = submission.SubmissionId }, new
        {
            submission.SubmissionId,
            submission.FormId,
            submission.CustomerId,
            DataJSON = JsonSerializer.Deserialize<object>(submission.DataJSON),
            submission.Status,
            submission.SubmittedDate
        });
    }

    // PUT: api/submissions/5/approve
    [HttpPut("{id}/approve")]
    public async Task<IActionResult> ApproveSubmission(int id)
    {
        var submission = await _context.Submissions.FindAsync(id);
        if (submission == null)
        {
            return NotFound();
        }

        submission.Status = SubmissionStatus.Approved;
        submission.ApprovedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Trigger webhook for approval event
        await TriggerWebhook(submission, WebhookEventType.Approved);

        return NoContent();
    }

    private async Task TriggerWebhook(Submission submission, WebhookEventType eventType)
    {
        // Find the election associated with this form
        var electionForm = await _context.ElectionForms
            .Include(ef => ef.Election)
            .FirstOrDefaultAsync(ef => ef.FormId == submission.FormId);

        if (electionForm == null) return;

        // Get webhooks for this election and event type
        var webhooks = await _context.Webhooks
            .Where(w => w.ElectionId == electionForm.ElectionId && w.EventType == eventType)
            .ToListAsync();

        var form = await _context.Forms.FindAsync(submission.FormId);
        var customer = await _context.Customers.FindAsync(submission.CustomerId);

        foreach (var webhook in webhooks)
        {
            try
            {
                var payload = new
                {
                    @event = eventType == WebhookEventType.Submitted ? "form_submitted" : "form_approved",
                    election = electionForm.Election.Name,
                    customer = customer?.Name,
                    form = form?.Name,
                    data = JsonSerializer.Deserialize<object>(submission.DataJSON),
                    submittedAt = submission.SubmittedDate,
                    approvedAt = submission.ApprovedDate
                };

                var httpClient = _httpClientFactory.CreateClient();
                var content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    System.Text.Encoding.UTF8,
                    "application/json"
                );

                await httpClient.PostAsync(webhook.Url, content);
            }
            catch
            {
                // Log error but don't fail the request
                // In production, you'd want proper error handling and logging
            }
        }
    }
}

public class SubmissionCreateDto
{
    public int FormId { get; set; }
    public int CustomerId { get; set; }
    public required object DataJSON { get; set; }
}

