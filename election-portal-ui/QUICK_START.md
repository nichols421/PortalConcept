# Quick Start - Election Portal UI

## 🚀 Run the Application

```bash
# Make sure you're in the election-portal-ui directory
cd election-portal-ui

# Start the development server
npm run dev
```

The app will be available at: **http://localhost:5173**

## ⚙️ Prerequisites

Before starting the frontend, make sure the backend API is running:

```bash
# In a separate terminal, from the project root
cd ElectionPortalAPI
dotnet run
```

Backend will run at: **http://localhost:5000**

## 📋 What to Test

### 1. Form Builder (Admin)
1. Navigate to **Form Builder** in the top menu
2. Create a new form:
   - Enter form name: "Test Form"
   - Add questions with different types (text, number, dropdown)
   - Preview the JSON schema
   - Save the form
3. View the form in the "Existing Forms" list

### 2. Election Builder (Admin)
1. Navigate to **Election Builder**
2. Create an election:
   - Name: "Test Election 2026"
   - Type: General
   - State: Colorado
3. Assign customers (Jefferson County, Madison County)
4. Attach forms you created
5. Configure webhooks:
   - Submitted: `http://localhost:5000/api/webhooks/test`
   - Approved: `http://localhost:5000/api/webhooks/test`

### 3. Customer Dashboard
1. Navigate to **Customer Dashboard**
2. Select an election from "My Elections"
3. Select a form from "Available Forms"
4. Fill out the form fields
5. Click "Submit Form"
6. Check the API console logs to see webhook triggered!
7. View submission in "My Submissions" table

## 🎯 Complete Workflow Test

1. **Create Form** (Admin → Form Builder)
   - Name: "Ballot Design Form"
   - Questions:
     - q1: Contest Name (text)
     - q2: Number of Candidates (number)
     - q3: Election Type (dropdown: Primary, General, Special)

2. **Create Election** (Admin → Election Builder)
   - Name: "Fall 2026 Primary"
   - Assign both customers
   - Attach the form you created
   - Configure webhooks

3. **Submit Form** (Customer Dashboard)
   - Select the election
   - Fill out the form
   - Submit
   - Watch for webhook in API logs

4. **Check Submissions**
   - View submission history in dashboard
   - Status should be "Submitted"

## 🔍 Troubleshooting

### Port already in use?
```bash
# Kill the process using port 5173
npx kill-port 5173
```

### API not responding?
- Make sure backend is running on port 5000
- Check CORS is enabled in backend
- Open browser console for error messages

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

## 📦 Project Structure

```
src/
├── components/
│   └── Layout.tsx           # Navigation & layout
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── admin/
│   │   ├── FormBuilder.tsx    # Create forms
│   │   └── ElectionBuilder.tsx # Create elections
│   └── customer/
│       └── CustomerDashboard.tsx # Submit forms
└── services/
    └── api.ts              # API integration
```

## 🎨 Features

✅ Responsive design (mobile & desktop)
✅ Modern UI with Tailwind CSS
✅ Real-time form preview
✅ Dynamic form rendering
✅ API integration with error handling
✅ TypeScript for type safety

## 🔗 API Endpoints Used

- `GET /api/customers` - List customers
- `GET /api/elections` - List elections
- `GET /api/elections/{id}` - Get election details
- `POST /api/elections` - Create election
- `POST /api/elections/{id}/assign-customers` - Assign customers
- `POST /api/elections/{id}/attach-forms` - Attach forms
- `GET /api/forms` - List forms
- `POST /api/forms` - Create form
- `GET /api/submissions` - List submissions
- `POST /api/submissions` - Submit form
- `POST /api/webhooks` - Configure webhook

## ✅ Task Completed

This completes **Task #5** from TASKS_FOR_CURSOR.md:

> "Create a React (Vite + Tailwind) project with routing for Admin and Customer views. Add sample pages for Form Builder, Election Builder, and Customer Dashboard."

## 🎯 Next Steps

- Task #6: Build Form Builder UI (✅ Already complete!)
- Task #7: Build Election Builder UI (✅ Already complete!)
- Task #8: Build Customer Portal (✅ Already complete!)
- Task #9: Approval Workflow
- Task #10: End-to-End Demo

Enjoy testing the Election Portal! 🎉

