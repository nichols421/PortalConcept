
---

# 🧩 FILE 4 — `TASKS_FOR_CURSOR.md`

### Purpose  
This is your “prompt bank.”  
Cursor can read this file to know what tasks to execute in sequence.  
Each task is designed to be short, testable, and produces one working deliverable.

---

```markdown
# Cursor Task List — Election Portal POC

---

### 🧰 1. Create Backend Scaffold
**Prompt:**
> Create a new ASP.NET 8 Web API project with EF Core and controllers for Elections, Forms, Customers, Submissions, and Webhooks. Use an in-memory database for now.

---

### 🧱 2. Define Models and Seed Data
**Prompt:**
> Add C# models for Customers, Elections, ElectionCustomers, Forms, ElectionForms, Submissions, and Webhooks as per TECH_SPEC.md. Seed two customers and one election for demo purposes.

---

### ⚙️ 3. Implement CRUD Endpoints
**Prompt:**
> Implement CRUD endpoints for Forms and Elections in the Web API following the specs in TECH_SPEC.md.

---

### 🌐 4. Add Webhook Logic
**Prompt:**
> Implement webhook POST logic that sends JSON data to configured URLs on form submission and approval events. Add a test endpoint `/api/webhooks/test` to log received data.

---

### 💻 5. Create React Frontend Scaffold
**Prompt:**
> Create a React (Vite + Tailwind) project with routing for Admin and Customer views. Add sample pages for Form Builder, Election Builder, and Customer Dashboard.

---

### 🧩 6. Build Form Builder UI
**Prompt:**
> Implement an Admin Form Builder component using React Hook Form where an admin can add questions (text, number, dropdown) and preview the generated JSON schema before saving.

---

### 📋 7. Build Election Builder UI
**Prompt:**
> Create an Election Builder page where an admin can name an election, assign existing customers, attach forms, and configure webhook URLs.

---

### 👤 8. Build Customer Portal
**Prompt:**
> Create a Customer Dashboard page showing assigned elections and forms. Implement a dynamic form renderer that uses the saved JSON schema to generate the form fields.

---

### ✅ 9. Approval Workflow
**Prompt:**
> Add an Admin page to list submitted forms, allow approving them, and trigger the “approved” webhook.

---

### 🔄 10. End-to-End Demo
**Prompt:**
> Wire everything together: Admin creates form and election, Customer submits, Admin approves. Show webhook logs confirming both events.

11. Transition Database from In-Memory to SQLite

Prompt:

Replace the EF Core in-memory database with a SQLite provider for persistence between runs.

Update Program.cs to use UseSqlite("Data Source=election.db").

Create a Migrations folder and run dotnet ef migrations add InitialCreate.

Ensure all models from TECH_SPEC.md have proper foreign key relationships.

Test by restarting the API and verifying that elections, forms, and submissions persist.

Expected Result:

The app now saves data in a local election.db file.

Restarting the server keeps your forms, elections, and submissions.

🧰 12. (Optional) Transition SQLite to SQL Server

Prompt:

Update the EF Core context to use SQL Server instead of SQLite.

Change UseSqlite(...) to UseSqlServer("Server=localhost;Database=ElectionPortal;Trusted_Connection=True;").

Apply migrations to SQL Server.

Verify data retrieval and webhook functionality still work.

Expected Result:

Fully working database using SQL Server for production-readiness.