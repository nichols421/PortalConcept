# Election Portal - Dynamic Form & Election Management System

A full-stack proof-of-concept application for managing elections with dynamic forms, customer assignments, and webhook notifications.

## 🎯 Project Overview

This POC demonstrates a modern web application where:
- **Admins** can create dynamic forms and elections without code changes
- **Customers** can view assigned elections, fill out forms, and submit data
- **Webhooks** automatically trigger on form submission and approval events
- **Form schemas** are stored as JSON, enabling rapid configuration changes

## 🏗 Architecture

### Backend
- **Framework:** ASP.NET Core 8 Web API
- **ORM:** Entity Framework Core 8
- **Database:** In-Memory (configurable to SQLite/SQL Server)
- **API Docs:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Routing:** React Router 6

## 📁 Project Structure

```
PortalConcept/
├── ElectionPortalAPI/              # Backend ASP.NET Core API
│   ├── Controllers/                # API controllers
│   ├── Models/                     # Entity models
│   ├── Data/                       # DbContext & seed data
│   ├── Program.cs                  # App configuration
│   └── README.md                   # Backend documentation
├── election-portal-ui/             # Frontend React application
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components
│   │   │   ├── admin/              # Admin views
│   │   │   └── customer/           # Customer views
│   │   └── services/               # API integration
│   └── README.md                   # Frontend documentation
├── Documents/                      # Project specifications
│   ├── PROJECT_OVERVIEW.md
│   ├── REQUIREMENTS.md
│   ├── TECH_SPEC.md
│   └── TASKS_FOR_CURSOR.md
├── PROJECT_SETUP_SUMMARY.md        # Backend setup summary
├── FRONTEND_SETUP_SUMMARY.md       # Frontend setup summary
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 20.x or higher
- npm

### 1. Start the Backend

```bash
cd ElectionPortalAPI
dotnet restore
dotnet run
```

Backend will be available at: **http://localhost:5000**
Swagger UI: **http://localhost:5000/swagger**

### 2. Start the Frontend

```bash
cd election-portal-ui
npm install
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## ✨ Features

### Admin Tools

**Form Builder** (`/admin/forms`)
- Create forms with dynamic JSON schemas
- Add questions: text fields, numbers, dropdowns
- Configure dropdown options
- Live JSON preview
- View all existing forms

**Election Builder** (`/admin/elections`)
- 4-step wizard to create elections
- Assign multiple customers to elections
- Attach multiple forms to elections
- Configure webhook URLs for events:
  - Form Submitted
  - Form Approved
- View and edit existing elections

### Customer Portal

**Customer Dashboard** (`/customer/dashboard`)
- View assigned elections
- Select and fill out forms dynamically
- Submit forms (triggers webhooks)
- Track submission history with status badges
- View submission dates and approval dates

### Webhook System

Automatic webhook triggers:
- **On Submission:** Sends form data, customer, election info
- **On Approval:** Confirms approval with timestamp

Webhook payload example:
```json
{
  "event": "form_submitted",
  "election": "Spring 2026 General",
  "customer": "Jefferson County",
  "form": "Ballot Design Form",
  "data": {
    "q1": "Mayor Race",
    "q2": "3"
  },
  "submittedAt": "2025-10-17T15:30:00Z"
}
```

## 📊 Database Schema

### Core Entities

- **Customers** - Election customers/counties
- **Elections** - Election campaigns
- **Forms** - Dynamic forms with JSON schemas
- **Submissions** - Customer form submissions
- **Webhooks** - Webhook configurations
- **ElectionCustomers** - Many-to-many (Elections ↔ Customers)
- **ElectionForms** - Many-to-many (Elections ↔ Forms)

### Seed Data

Pre-loaded with:
- 2 Customers: Jefferson County, Madison County
- 1 Election: Spring 2026 General
- Both customers assigned to the election

## 🎬 Complete Demo Workflow

1. **Create a Form** (Admin)
   - Go to Form Builder
   - Add questions (e.g., Contest Name, Number of Candidates)
   - Save form

2. **Create an Election** (Admin)
   - Go to Election Builder
   - Create election with name, type, state
   - Assign customers (Jefferson County, Madison County)
   - Attach the form you created
   - Configure webhooks

3. **Submit a Form** (Customer)
   - Go to Customer Dashboard
   - Select the election
   - Select the form
   - Fill out and submit
   - Watch webhook trigger in API console!

4. **Approve Submission** (Admin - Future Task)
   - View pending submissions
   - Approve submission
   - Webhook triggers for approval event

## 📖 API Endpoints

### Customers
- `GET /api/customers` - List all
- `POST /api/customers` - Create
- `GET /api/customers/{id}` - Get one

### Elections
- `GET /api/elections` - List all
- `GET /api/elections/{id}` - Get with details
- `POST /api/elections` - Create
- `POST /api/elections/{id}/assign-customers` - Assign
- `POST /api/elections/{id}/attach-forms` - Attach

### Forms
- `GET /api/forms` - List all
- `POST /api/forms` - Create with JSON schema
- `PUT /api/forms/{id}` - Update
- `DELETE /api/forms/{id}` - Delete

### Submissions
- `GET /api/submissions` - List all
- `POST /api/submissions` - Submit (webhook)
- `PUT /api/submissions/{id}/approve` - Approve (webhook)

### Webhooks
- `GET /api/webhooks` - List all
- `POST /api/webhooks` - Configure
- `POST /api/webhooks/test` - Test endpoint

## ✅ Tasks Completed

From `Documents/TASKS_FOR_CURSOR.md`:

- ✅ **Task 1:** Create ASP.NET 8 Web API with EF Core
- ✅ **Task 2:** Define models and seed data
- ✅ **Task 3:** Implement CRUD endpoints
- ✅ **Task 4:** Add webhook logic
- ✅ **Task 5:** Create React frontend scaffold
- ✅ **Task 6:** Build Form Builder UI
- ✅ **Task 7:** Build Election Builder UI
- ✅ **Task 8:** Build Customer Portal

### Next Steps

- **Task 9:** Approval Workflow (admin page for approvals)
- **Task 10:** End-to-End Demo
- **Task 11:** Migrate to SQLite for persistence
- **Task 12:** Migrate to SQL Server for production

## 🛠 Technology Stack

| Component | Technology |
|-----------|-----------|
| Backend API | ASP.NET Core 8 |
| ORM | Entity Framework Core 8 |
| Database | In-Memory (configurable) |
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| API Docs | Swagger/OpenAPI |

## 📚 Documentation

- **ElectionPortalAPI/README.md** - Backend documentation
- **election-portal-ui/README.md** - Frontend documentation
- **ElectionPortalAPI/QUICK_START.md** - Backend quick reference
- **election-portal-ui/QUICK_START.md** - Frontend quick reference
- **PROJECT_SETUP_SUMMARY.md** - Backend setup details
- **FRONTEND_SETUP_SUMMARY.md** - Frontend setup details

## 🔧 Configuration

### Backend Port
Default: `http://localhost:5000`

Change in: `ElectionPortalAPI/Properties/launchSettings.json`

### Frontend Port
Default: `http://localhost:5173`

Change in: `election-portal-ui/vite.config.ts`

### API Base URL
Frontend connects to backend at: `http://localhost:5000/api`

Change in: `election-portal-ui/src/services/api.ts`

## 🎨 UI Screenshots

### Form Builder
- Dynamic question creation
- Support for text, number, dropdown fields
- Live JSON preview
- Form management

### Election Builder
- Step-by-step wizard
- Customer assignment
- Form attachment
- Webhook configuration

### Customer Dashboard
- Three-column layout
- Election selection
- Dynamic form rendering
- Submission tracking

## 🔒 Security Notes

This is a POC with simplified security:
- No authentication/authorization
- Mock customer login
- CORS enabled for all origins
- In-memory database (no persistence)

For production, implement:
- JWT/OAuth authentication
- Role-based authorization
- Secure CORS policy
- Persistent database with encryption
- Input validation and sanitization
- Rate limiting
- Webhook signature verification

## 🐛 Troubleshooting

### Backend won't start?
- Check if port 5000 is available
- Verify .NET 8 SDK is installed: `dotnet --version`

### Frontend won't start?
- Check if port 5173 is available
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (requires 20.x+)

### API calls failing?
- Ensure backend is running
- Check browser console for CORS errors
- Verify API URLs in `election-portal-ui/src/services/api.ts`

### Webhooks not triggering?
- Check backend console for webhook logs
- Verify webhook URLs are correct
- Use `/api/webhooks/test` endpoint for testing

## 📝 License

This is a proof-of-concept project for demonstration purposes.

## 👥 Contributors

Created using Cursor AI on October 17, 2025

---

**Status:** ✅ Fully Functional POC  
**Backend:** ✅ Complete  
**Frontend:** ✅ Complete  
**Integration:** ✅ Working  

Ready for demo and further development!

