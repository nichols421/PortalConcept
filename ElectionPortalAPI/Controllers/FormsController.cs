using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectionPortalAPI.Data;
using ElectionPortalAPI.Models;
using System.Text.Json;

namespace ElectionPortalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FormsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FormsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/forms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetForms()
    {
        var forms = await _context.Forms.ToListAsync();
        
        // Return forms with parsed JSON schema
        return Ok(forms.Select(f => new
        {
            f.FormId,
            f.Name,
            SchemaJSON = JsonSerializer.Deserialize<object>(f.SchemaJSON)
        }));
    }

    // GET: api/forms/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetForm(int id)
    {
        var form = await _context.Forms.FindAsync(id);

        if (form == null)
        {
            return NotFound();
        }

        return new
        {
            form.FormId,
            form.Name,
            SchemaJSON = JsonSerializer.Deserialize<object>(form.SchemaJSON)
        };
    }

    // POST: api/forms
    [HttpPost]
    public async Task<ActionResult<Form>> CreateForm(FormCreateDto dto)
    {
        var form = new Form
        {
            Name = dto.Name,
            SchemaJSON = JsonSerializer.Serialize(dto.SchemaJSON)
        };

        _context.Forms.Add(form);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetForm), new { id = form.FormId }, new
        {
            form.FormId,
            form.Name,
            SchemaJSON = JsonSerializer.Deserialize<object>(form.SchemaJSON)
        });
    }

    // PUT: api/forms/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateForm(int id, FormCreateDto dto)
    {
        var form = await _context.Forms.FindAsync(id);
        if (form == null)
        {
            return NotFound();
        }

        form.Name = dto.Name;
        form.SchemaJSON = JsonSerializer.Serialize(dto.SchemaJSON);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FormExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/forms/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteForm(int id)
    {
        var form = await _context.Forms.FindAsync(id);
        if (form == null)
        {
            return NotFound();
        }

        _context.Forms.Remove(form);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FormExists(int id)
    {
        return _context.Forms.Any(e => e.FormId == id);
    }
}

public class FormCreateDto
{
    public required string Name { get; set; }
    public required object SchemaJSON { get; set; }
}

