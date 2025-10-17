# Election Portal API

ASP.NET 8 Web API for the Election Portal POC with Entity Framework Core and in-memory database.

## Features

- **Elections Management**: Create and manage elections with types and states
- **Forms Management**: Create dynamic forms with JSON schemas
- **Customers Management**: Manage customer accounts
- **Submissions**: Handle form submissions with approval workflow
- **Webhooks**: Configure and trigger webhooks on submission and approval events

## Tech Stack

- ASP.NET Core 8
- Entity Framework Core 8 (In-Memory Database)
- Swagger/OpenAPI for API documentation

## Getting Started

### Prerequisites

- .NET 8 SDK

### Running the Application

1. Navigate to the project directory:
   ```bash
   cd ElectionPortalAPI
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

4. Open your browser and navigate to:
   - Swagger UI: `http://localhost:5000/swagger`
   - API Base URL: `http://localhost:5000/api`

## API Endpoints

### Customers
- `GET /api/customers` - List all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Forms
- `GET /api/forms` - List all forms
- `GET /api/forms/{id}` - Get form by ID
- `POST /api/forms` - Create new form with JSON schema
- `PUT /api/forms/{id}` - Update form
- `DELETE /api/forms/{id}` - Delete form

### Elections
- `GET /api/elections` - List all elections
- `GET /api/elections/{id}` - Get election details with customers and forms
- `POST /api/elections` - Create new election
- `PUT /api/elections/{id}` - Update election
- `POST /api/elections/{id}/assign-customers` - Assign customers to election
- `POST /api/elections/{id}/attach-forms` - Attach forms to election
- `DELETE /api/elections/{id}` - Delete election

### Submissions
- `GET /api/submissions` - List all submissions
- `GET /api/submissions/{id}` - Get submission by ID
- `POST /api/submissions` - Create new submission (triggers webhook)
- `PUT /api/submissions/{id}/approve` - Approve submission (triggers webhook)

### Webhooks
- `GET /api/webhooks` - List all webhooks
- `GET /api/webhooks/{id}` - Get webhook by ID
- `POST /api/webhooks` - Create new webhook
- `PUT /api/webhooks/{id}` - Update webhook
- `DELETE /api/webhooks/{id}` - Delete webhook
- `POST /api/webhooks/test` - Test endpoint for webhook debugging

## Seed Data

The application comes with pre-seeded data:
- **2 Customers**: Jefferson County, Madison County
- **1 Election**: Spring 2026 General (assigned to both customers)

## Example Requests

### Create a Form
```json
POST /api/forms
{
  "name": "Ballot Design Form",
  "schemaJSON": {
    "questions": [
      { "id": "q1", "label": "Contest Name", "type": "text" },
      { "id": "q2", "label": "Candidates", "type": "text" }
    ]
  }
}
```

### Submit a Form
```json
POST /api/submissions
{
  "formId": 1,
  "customerId": 1,
  "dataJSON": {
    "Contest Name": "Mayor",
    "Candidates": "Alice, Bob"
  }
}
```

### Create a Webhook
```json
POST /api/webhooks
{
  "electionId": 1,
  "eventType": 0,
  "url": "http://localhost:5000/api/webhooks/test"
}
```
Note: eventType: 0 = Submitted, 1 = Approved

## Database

Currently using an in-memory database. Data will be reset when the application restarts.

To migrate to SQLite or SQL Server, see the TASKS_FOR_CURSOR.md document for instructions.

## Next Steps

1. Create forms for your election
2. Attach forms to elections
3. Configure webhooks
4. Have customers submit forms
5. Approve submissions and watch webhooks trigger

## Development

### Project Structure
```
ElectionPortalAPI/
├── Controllers/       # API Controllers
├── Data/             # DbContext
├── Models/           # Entity Models
├── Properties/       # Launch settings
├── Program.cs        # Application entry point
└── appsettings.json  # Configuration
```

