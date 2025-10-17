# Election Portal POC — Dynamic Form Builder

## 🎯 Goal
Build a proof-of-concept (POC) for a new Election Customer Portal.  
The portal will allow **admins** to create elections and attach **dynamic forms** that **customers** can fill out, submit, and get approved.  
Each submission step triggers a **webhook** to external systems.

## 🧱 Tech Stack
- **Frontend:** React + TailwindCSS (Vite or Next.js)
- **Backend:** .NET 8 Web API
- **Database:** SQL Server (EF Core)
- **Hosting:** Local for POC
- **Tools:** Cursor for rapid development

## ⚙️ Core Features (POC Scope)
1. Admin can create forms dynamically (question + answer options)
2. Admin can create elections and assign customers
3. Admin can attach forms and webhook URLs to elections
4. Customers can log in, fill out and submit forms
5. Admins can approve submissions
6. Webhooks trigger on "submitted" and "approved" events

## 🧩 Key Entities
- **Customers:** Pulled or mocked from IFS
- **Elections:** Contain customers and forms
- **Forms:** JSON-based structure
- **Submissions:** Stores customer answers and status
- **Webhooks:** Define URLs for submission + approval events

## 🔗 Flow Overview
1. Admin creates election → adds customers → attaches forms
2. Customer logs in → completes assigned forms
3. Submission triggers webhook
4. Admin approves → approval webhook triggers