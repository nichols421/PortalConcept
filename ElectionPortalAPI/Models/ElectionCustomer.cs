namespace ElectionPortalAPI.Models;

public class ElectionCustomer
{
    public int ElectionId { get; set; }
    public Election Election { get; set; } = null!;

    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
}

