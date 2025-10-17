# Requirements — Election Portal POC

## Functional Requirements

### Admin Features
- Create and edit dynamic forms
  - Add questions: ID, Label, Type (text, number, dropdown)
  - Add possible answers for dropdowns
- Create an election
  - Name, type, state
  - Assign customers
  - Attach forms to the election
- Configure webhooks
  - One for “Form Submitted”
  - One for “Form Approved”
  - Show example JSON payload

### Customer Features
- Log in and view assigned elections
- Select election and fill out assigned forms
- Submit completed form

### Approval Flow
- Admin can view all submissions by election and status
- Approve or reject submission
- Trigger webhook on approval

### Webhooks
- POST requests with JSON body
- Include event type, form data, election/customer context
- Configurable URLs per election
- Signed payloads for verification (future phase)

## Non-Functional Requirements
- Must support rapid schema changes (no code deployment)
- API-first design
- React frontend consumes .NET API
- Store all data in SQL Server (EF Core)
- Use role-based login (Admin, Customer)
