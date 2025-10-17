using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectionPortalAPI.Data;
using ElectionPortalAPI.Models;

namespace ElectionPortalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ElectionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ElectionsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/elections
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Election>>> GetElections()
    {
        return await _context.Elections
            .Include(e => e.ElectionCustomers)
            .Include(e => e.ElectionForms)
            .ToListAsync();
    }

    // GET: api/elections/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetElection(int id)
    {
        var election = await _context.Elections
            .Include(e => e.ElectionCustomers)
                .ThenInclude(ec => ec.Customer)
            .Include(e => e.ElectionForms)
                .ThenInclude(ef => ef.Form)
            .Include(e => e.Webhooks)
            .FirstOrDefaultAsync(e => e.ElectionId == id);

        if (election == null)
        {
            return NotFound();
        }

        return new
        {
            election.ElectionId,
            election.Name,
            election.Type,
            election.State,
            Customers = election.ElectionCustomers.Select(ec => new
            {
                ec.Customer.CustomerId,
                ec.Customer.Name
            }),
            Forms = election.ElectionForms.Select(ef => new
            {
                ef.Form.FormId,
                ef.Form.Name
            }),
            Webhooks = election.Webhooks.Select(w => new
            {
                w.WebhookId,
                w.EventType,
                w.Url
            })
        };
    }

    // POST: api/elections
    [HttpPost]
    public async Task<ActionResult<Election>> CreateElection(ElectionCreateDto dto)
    {
        var election = new Election
        {
            Name = dto.Name,
            Type = dto.Type,
            State = dto.State
        };

        _context.Elections.Add(election);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetElection), new { id = election.ElectionId }, election);
    }

    // PUT: api/elections/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateElection(int id, ElectionCreateDto dto)
    {
        var election = await _context.Elections.FindAsync(id);
        if (election == null)
        {
            return NotFound();
        }

        election.Name = dto.Name;
        election.Type = dto.Type;
        election.State = dto.State;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ElectionExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // POST: api/elections/5/assign-customers
    [HttpPost("{id}/assign-customers")]
    public async Task<IActionResult> AssignCustomers(int id, AssignCustomersDto dto)
    {
        var election = await _context.Elections
            .Include(e => e.ElectionCustomers)
            .FirstOrDefaultAsync(e => e.ElectionId == id);

        if (election == null)
        {
            return NotFound();
        }

        // Remove existing assignments
        _context.ElectionCustomers.RemoveRange(election.ElectionCustomers);

        // Add new assignments
        foreach (var customerId in dto.CustomerIds)
        {
            if (await _context.Customers.AnyAsync(c => c.CustomerId == customerId))
            {
                election.ElectionCustomers.Add(new ElectionCustomer
                {
                    ElectionId = id,
                    CustomerId = customerId
                });
            }
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/elections/5/attach-forms
    [HttpPost("{id}/attach-forms")]
    public async Task<IActionResult> AttachForms(int id, AttachFormsDto dto)
    {
        var election = await _context.Elections
            .Include(e => e.ElectionForms)
            .FirstOrDefaultAsync(e => e.ElectionId == id);

        if (election == null)
        {
            return NotFound();
        }

        // Remove existing assignments
        _context.ElectionForms.RemoveRange(election.ElectionForms);

        // Add new assignments
        foreach (var formId in dto.FormIds)
        {
            if (await _context.Forms.AnyAsync(f => f.FormId == formId))
            {
                election.ElectionForms.Add(new ElectionForm
                {
                    ElectionId = id,
                    FormId = formId
                });
            }
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/elections/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteElection(int id)
    {
        var election = await _context.Elections.FindAsync(id);
        if (election == null)
        {
            return NotFound();
        }

        _context.Elections.Remove(election);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ElectionExists(int id)
    {
        return _context.Elections.Any(e => e.ElectionId == id);
    }
}

public class ElectionCreateDto
{
    public required string Name { get; set; }
    public string? Type { get; set; }
    public string? State { get; set; }
}

public class AssignCustomersDto
{
    public required List<int> CustomerIds { get; set; }
}

public class AttachFormsDto
{
    public required List<int> FormIds { get; set; }
}

