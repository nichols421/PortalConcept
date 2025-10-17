using Microsoft.EntityFrameworkCore;
using ElectionPortalAPI.Models;

namespace ElectionPortalAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Election> Elections { get; set; }
    public DbSet<ElectionCustomer> ElectionCustomers { get; set; }
    public DbSet<Form> Forms { get; set; }
    public DbSet<ElectionForm> ElectionForms { get; set; }
    public DbSet<Submission> Submissions { get; set; }
    public DbSet<Webhook> Webhooks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure many-to-many relationship: Election <-> Customer
        modelBuilder.Entity<ElectionCustomer>()
            .HasKey(ec => new { ec.ElectionId, ec.CustomerId });

        modelBuilder.Entity<ElectionCustomer>()
            .HasOne(ec => ec.Election)
            .WithMany(e => e.ElectionCustomers)
            .HasForeignKey(ec => ec.ElectionId);

        modelBuilder.Entity<ElectionCustomer>()
            .HasOne(ec => ec.Customer)
            .WithMany(c => c.ElectionCustomers)
            .HasForeignKey(ec => ec.CustomerId);

        // Configure many-to-many relationship: Election <-> Form
        modelBuilder.Entity<ElectionForm>()
            .HasKey(ef => new { ef.ElectionId, ef.FormId });

        modelBuilder.Entity<ElectionForm>()
            .HasOne(ef => ef.Election)
            .WithMany(e => e.ElectionForms)
            .HasForeignKey(ef => ef.ElectionId);

        modelBuilder.Entity<ElectionForm>()
            .HasOne(ef => ef.Form)
            .WithMany(f => f.ElectionForms)
            .HasForeignKey(ef => ef.FormId);

        // Configure Submission relationships
        modelBuilder.Entity<Submission>()
            .HasOne(s => s.Form)
            .WithMany(f => f.Submissions)
            .HasForeignKey(s => s.FormId);

        modelBuilder.Entity<Submission>()
            .HasOne(s => s.Customer)
            .WithMany(c => c.Submissions)
            .HasForeignKey(s => s.CustomerId);

        // Configure Webhook relationship
        modelBuilder.Entity<Webhook>()
            .HasOne(w => w.Election)
            .WithMany(e => e.Webhooks)
            .HasForeignKey(w => w.ElectionId);

        // Seed data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Seed Customers
        modelBuilder.Entity<Customer>().HasData(
            new Customer { CustomerId = 1, Name = "Jefferson County" },
            new Customer { CustomerId = 2, Name = "Madison County" }
        );

        // Seed Election
        modelBuilder.Entity<Election>().HasData(
            new Election 
            { 
                ElectionId = 1, 
                Name = "Spring 2026 General", 
                Type = "General",
                State = "Colorado"
            }
        );

        // Assign customers to election
        modelBuilder.Entity<ElectionCustomer>().HasData(
            new ElectionCustomer { ElectionId = 1, CustomerId = 1 },
            new ElectionCustomer { ElectionId = 1, CustomerId = 2 }
        );
    }
}

