# Technical Specification — Election Portal POC

## 🗄 Database Schema (Simplified for POC)

**Customers**
- CustomerId (PK)
- Name

**Elections**
- ElectionId (PK)
- Name
- Type
- State

**ElectionCustomers**
- ElectionId (FK)
- CustomerId (FK)

**Forms**
- FormId (PK)
- Name
- SchemaJSON (text)

**ElectionForms**
- ElectionId (FK)
- FormId (FK)

**Submissions**
- SubmissionId (PK)
- FormId (FK)
- CustomerId (FK)
- DataJSON (text)
- Status (Draft | Submitted | Approved)
- SubmittedDate
- ApprovedDate

**Webhooks**
- WebhookId (PK)
- ElectionId (FK)
- EventType (Submitted | Approved)
- Url
- ExamplePayloadJSON

---

## 🌐 API Endpoints (Initial)

### Forms
| Method | Route | Description |
|---------|--------|-------------|
| GET | `/api/forms` | List all forms |
| POST | `/api/forms` | Create a new form (JSON schema) |
| GET | `/api/forms/{id}` | Retrieve one form |
| PUT | `/api/forms/{id}` | Update form |
| DELETE | `/api/forms/{id}` | Delete form |

### Elections
| Method | Route | Description |
|---------|--------|-------------|
| GET | `/api/elections` | List elections |
| POST | `/api/elections` | Create new election |
| GET | `/api/elections/{id}` | Get details, forms, customers |
| PUT | `/api/elections/{id}` | Update election |
| POST | `/api/elections/{id}/assign-customers` | Attach customers |
| POST | `/api/elections/{id}/attach-forms` | Attach forms |

### Submissions
| Method | Route | Description |
|---------|--------|-------------|
| GET | `/api/submissions` | List all submissions |
| POST | `/api/submissions` | Create (customer submits form) |
| PUT | `/api/submissions/{id}/approve` | Approve submission |

### Webhooks
| Method | Route | Description |
|---------|--------|-------------|
| POST | `/api/webhooks/test` | For local testing |
| POST | `/api/webhooks/{eventType}` | Triggered internally |

---

## 🔔 Webhook Payload Example

```json
{
  "event": "form_submitted",
  "election": "Spring 2026",
  "customer": "Jefferson County",
  "form": "Ballot Design Form",
  "data": {
    "contest1": "Mayor",
    "candidates": ["Alice", "Bob"]
  },
  "submittedAt": "2025-10-17T15:04:00Z"
}
