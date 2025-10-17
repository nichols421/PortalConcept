using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectionPortalAPI.Data;
using ElectionPortalAPI.Models;
using System.Text.Json;

namespace ElectionPortalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebhooksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<WebhooksController> _logger;

    public WebhooksController(ApplicationDbContext context, ILogger<WebhooksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/webhooks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Webhook>>> GetWebhooks()
    {
        return await _context.Webhooks.ToListAsync();
    }

    // GET: api/webhooks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Webhook>> GetWebhook(int id)
    {
        var webhook = await _context.Webhooks.FindAsync(id);

        if (webhook == null)
        {
            return NotFound();
        }

        return webhook;
    }

    // POST: api/webhooks
    [HttpPost]
    public async Task<ActionResult<Webhook>> CreateWebhook(WebhookCreateDto dto)
    {
        var webhook = new Webhook
        {
            ElectionId = dto.ElectionId,
            EventType = dto.EventType,
            Url = dto.Url,
            ExamplePayloadJSON = dto.ExamplePayloadJSON
        };

        _context.Webhooks.Add(webhook);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWebhook), new { id = webhook.WebhookId }, webhook);
    }

    // PUT: api/webhooks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWebhook(int id, WebhookCreateDto dto)
    {
        var webhook = await _context.Webhooks.FindAsync(id);
        if (webhook == null)
        {
            return NotFound();
        }

        webhook.ElectionId = dto.ElectionId;
        webhook.EventType = dto.EventType;
        webhook.Url = dto.Url;
        webhook.ExamplePayloadJSON = dto.ExamplePayloadJSON;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!WebhookExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/webhooks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWebhook(int id)
    {
        var webhook = await _context.Webhooks.FindAsync(id);
        if (webhook == null)
        {
            return NotFound();
        }

        _context.Webhooks.Remove(webhook);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/webhooks/test
    [HttpPost("test")]
    public IActionResult TestWebhook([FromBody] object payload)
    {
        _logger.LogInformation("Webhook test received:");
        _logger.LogInformation(JsonSerializer.Serialize(payload, new JsonSerializerOptions { WriteIndented = true }));

        return Ok(new
        {
            message = "Webhook received successfully",
            timestamp = DateTime.UtcNow,
            payload
        });
    }

    private bool WebhookExists(int id)
    {
        return _context.Webhooks.Any(e => e.WebhookId == id);
    }
}

public class WebhookCreateDto
{
    public int ElectionId { get; set; }
    public WebhookEventType EventType { get; set; }
    public required string Url { get; set; }
    public string? ExamplePayloadJSON { get; set; }
}

