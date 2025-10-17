namespace ElectionPortalAPI.Models;

public class Submission
{
    public int SubmissionId { get; set; }
    
    public int FormId { get; set; }
    public Form Form { get; set; } = null!;
    
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    
    public required string DataJSON { get; set; }
    public SubmissionStatus Status { get; set; } = SubmissionStatus.Draft;
    public DateTime? SubmittedDate { get; set; }
    public DateTime? ApprovedDate { get; set; }
}

public enum SubmissionStatus
{
    Draft,
    Submitted,
    Approved
}

