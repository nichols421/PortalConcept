namespace ElectionPortalAPI.Models;

public class Election
{
    public int ElectionId { get; set; }
    public required string Name { get; set; }
    public string? Type { get; set; }
    public string? State { get; set; }

    // Navigation properties
    public ICollection<ElectionCustomer> ElectionCustomers { get; set; } = new List<ElectionCustomer>();
    public ICollection<ElectionForm> ElectionForms { get; set; } = new List<ElectionForm>();
    public ICollection<Webhook> Webhooks { get; set; } = new List<Webhook>();
}

