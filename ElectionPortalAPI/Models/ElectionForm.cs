namespace ElectionPortalAPI.Models;

public class ElectionForm
{
    public int ElectionId { get; set; }
    public Election Election { get; set; } = null!;

    public int FormId { get; set; }
    public Form Form { get; set; } = null!;
}

