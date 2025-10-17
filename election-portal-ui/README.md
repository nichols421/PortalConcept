# Election Portal UI

React + Vite + TypeScript + Tailwind CSS frontend for the Election Portal POC.

## Features

- **Admin Tools**
  - Form Builder: Create dynamic forms with text, number, and dropdown fields
  - Election Builder: Create elections, assign customers, attach forms, configure webhooks
  
- **Customer Portal**
  - Dashboard: View assigned elections and forms
  - Form Submission: Fill out and submit forms dynamically
  - Submission History: Track submission status

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router 6

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## Project Structure

```
election-portal-ui/
├── src/
│   ├── components/         # Reusable components
│   │   └── Layout.tsx      # Main layout with navigation
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── admin/          # Admin pages
│   │   │   ├── FormBuilder.tsx
│   │   │   └── ElectionBuilder.tsx
│   │   └── customer/       # Customer pages
│   │       └── CustomerDashboard.tsx
│   ├── services/           # API service layer
│   │   └── api.ts          # API client for backend
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles with Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
└── package.json            # Dependencies
```

## API Integration

The app connects to the ASP.NET Core API at `http://localhost:5000/api`.

Make sure the backend API is running before starting the frontend:

```bash
cd ../ElectionPortalAPI
dotnet run
```

## Routes

- `/` - Home page
- `/admin/forms` - Form Builder (Admin)
- `/admin/elections` - Election Builder (Admin)
- `/customer/dashboard` - Customer Dashboard

## Key Features

### Form Builder
- Create forms with dynamic JSON schemas
- Add questions: text, number, dropdown
- Live preview of form structure
- View all existing forms

### Election Builder
- Step-by-step election creation wizard
- Assign multiple customers to elections
- Attach multiple forms to elections
- Configure webhooks for submission and approval events
- View all existing elections

### Customer Dashboard
- View assigned elections
- Select and fill out forms dynamically
- Submit forms (triggers webhooks)
- View submission history with status tracking

## Environment Variables

Create a `.env` file in the root directory if you need to customize the API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Styling

The app uses Tailwind CSS for styling with a modern, clean design:
- Blue color scheme for admin features
- Green color scheme for customer features
- Responsive design for mobile and desktop
- Hover states and transitions for better UX

## Development Notes

- The app uses TypeScript for type safety
- API calls are centralized in `src/services/api.ts`
- React Router handles client-side routing
- Mock customer ID (1 = Jefferson County) is used in the dashboard

## Next Steps

This completes Task #5 from the project roadmap. Future enhancements:

1. Add authentication and user management
2. Implement real-time updates with WebSockets
3. Add form validation
4. Implement admin approval interface
5. Add file upload capabilities
6. Enhance error handling and loading states
