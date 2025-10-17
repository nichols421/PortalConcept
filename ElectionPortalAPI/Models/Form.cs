namespace ElectionPortalAPI.Models;

public class Form
{
    public int FormId { get; set; }
    public required string Name { get; set; }
    public required string SchemaJSON { get; set; }

    // Navigation properties
    public ICollection<ElectionForm> ElectionForms { get; set; } = new List<ElectionForm>();
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}

