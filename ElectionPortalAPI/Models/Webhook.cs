namespace ElectionPortalAPI.Models;

public class Webhook
{
    public int WebhookId { get; set; }
    
    public int ElectionId { get; set; }
    public Election Election { get; set; } = null!;
    
    public WebhookEventType EventType { get; set; }
    public required string Url { get; set; }
    public string? ExamplePayloadJSON { get; set; }
}

public enum WebhookEventType
{
    Submitted,
    Approved
}

