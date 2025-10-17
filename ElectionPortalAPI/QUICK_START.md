# Quick Start Guide - Election Portal API

## What Was Created

A complete ASP.NET 8 Web API with:
- ✅ 7 Entity Models (Customer, Election, ElectionCustomer, Form, ElectionForm, Submission, Webhook)
- ✅ 5 REST API Controllers (Customers, Elections, Forms, Submissions, Webhooks)
- ✅ Entity Framework Core with In-Memory Database
- ✅ Seed data (2 customers, 1 election)
- ✅ Swagger/OpenAPI documentation
- ✅ CORS enabled for frontend integration
- ✅ Webhook system for submission and approval events

## Project Structure

```
ElectionPortalAPI/
├── Controllers/
│   ├── CustomersController.cs      # Customer CRUD operations
│   ├── ElectionsController.cs      # Election management + assignments
│   ├── FormsController.cs          # Dynamic form builder
│   ├── SubmissionsController.cs    # Form submissions + approvals
│   └── WebhooksController.cs       # Webhook configuration + testing
├── Data/
│   └── ApplicationDbContext.cs     # EF Core DbContext + seed data
├── Models/
│   ├── Customer.cs
│   ├── Election.cs
│   ├── ElectionCustomer.cs         # Many-to-many join table
│   ├── Form.cs
│   ├── ElectionForm.cs             # Many-to-many join table
│   ├── Submission.cs
│   └── Webhook.cs
├── Properties/
│   └── launchSettings.json         # Launch configuration
├── Program.cs                      # Application startup + DI config
├── appsettings.json
├── ElectionPortalAPI.csproj
├── README.md
└── test-api.http                   # Sample API requests
```

## Run the API

1. **Navigate to project:**
   ```bash
   cd ElectionPortalAPI
   ```

2. **Run the API:**
   ```bash
   dotnet run
   ```

3. **Access Swagger UI:**
   - Open browser: http://localhost:5000/swagger
   - Test all endpoints interactively

## Test the API

### Using the test-api.http file
Open `test-api.http` in VS Code with REST Client extension and click "Send Request" above each request.

### Quick Test Flow

1. **View pre-seeded data:**
   ```
   GET http://localhost:5000/api/customers
   GET http://localhost:5000/api/elections/1
   ```

2. **Create a form:**
   ```
   POST http://localhost:5000/api/forms
   {
     "name": "Ballot Design Form",
     "schemaJSON": {
       "questions": [
         {"id": "q1", "label": "Contest Name", "type": "text"}
       ]
     }
   }
   ```

3. **Attach form to election:**
   ```
   POST http://localhost:5000/api/elections/1/attach-forms
   {"formIds": [1]}
   ```

4. **Configure webhook:**
   ```
   POST http://localhost:5000/api/webhooks
   {
     "electionId": 1,
     "eventType": 0,
     "url": "http://localhost:5000/api/webhooks/test"
   }
   ```

5. **Submit a form (triggers webhook):**
   ```
   POST http://localhost:5000/api/submissions
   {
     "formId": 1,
     "customerId": 1,
     "dataJSON": {"q1": "Mayor Race"}
   }
   ```

6. **Approve submission (triggers webhook):**
   ```
   PUT http://localhost:5000/api/submissions/1/approve
   ```

## Seed Data

The application starts with:
- **Customers:** Jefferson County, Madison County
- **Election:** Spring 2026 General (both customers assigned)

## Key Features

### Dynamic Forms
Forms are stored as JSON schemas allowing you to create any structure without code changes:
```json
{
  "questions": [
    {"id": "q1", "label": "Question", "type": "text"},
    {"id": "q2", "label": "Number", "type": "number"},
    {"id": "q3", "label": "Choice", "type": "dropdown", "options": ["A", "B"]}
  ]
}
```

### Webhook System
Webhooks automatically trigger on:
- **Submitted** (eventType: 0) - When customer submits form
- **Approved** (eventType: 1) - When admin approves submission

Webhook payload example:
```json
{
  "event": "form_submitted",
  "election": "Spring 2026 General",
  "customer": "Jefferson County",
  "form": "Ballot Design Form",
  "data": { "q1": "Mayor Race" },
  "submittedAt": "2025-10-17T15:30:00Z"
}
```

## API Endpoints Summary

| Resource | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| Customers | GET | `/api/customers` | List all |
| | GET | `/api/customers/{id}` | Get one |
| | POST | `/api/customers` | Create |
| Elections | GET | `/api/elections` | List all |
| | GET | `/api/elections/{id}` | Get with details |
| | POST | `/api/elections` | Create |
| | POST | `/api/elections/{id}/assign-customers` | Assign customers |
| | POST | `/api/elections/{id}/attach-forms` | Attach forms |
| Forms | GET | `/api/forms` | List all |
| | POST | `/api/forms` | Create with schema |
| Submissions | GET | `/api/submissions` | List all |
| | POST | `/api/submissions` | Submit form |
| | PUT | `/api/submissions/{id}/approve` | Approve |
| Webhooks | GET | `/api/webhooks` | List all |
| | POST | `/api/webhooks` | Configure |
| | POST | `/api/webhooks/test` | Test endpoint |

## Next Steps

This completes **Task 1** from TASKS_FOR_CURSOR.md. 

You can now proceed to:
- **Task 2:** Add more models and seed data
- **Task 3:** Implement additional CRUD endpoints
- **Task 4:** Enhance webhook logic
- **Task 11:** Migrate to SQLite for persistence
- **Task 12:** Migrate to SQL Server for production

## Troubleshooting

**Port already in use?**
Edit `Properties/launchSettings.json` and change the port numbers.

**Need to reset data?**
Restart the application - in-memory database is cleared on restart.

**Webhook not triggering?**
Check console output for webhook logs. Ensure webhook URL is correct and reachable.

