namespace ElectionPortalAPI.Models;

public class Customer
{
    public int CustomerId { get; set; }
    public required string Name { get; set; }

    // Navigation properties
    public ICollection<ElectionCustomer> ElectionCustomers { get; set; } = new List<ElectionCustomer>();
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}

