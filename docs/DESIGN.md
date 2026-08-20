# Booking System - Admin Dashboard Design Guidelines

## 1. Overview & Architecture
A generic, multi-purpose booking application admin interface focused on rapid appointment processing, status management, and clean data presentation.

## 2. Admin Dashboard Visual & Structural Concept

### Layout & Navigation
- Navigation Style: Top Horizontal Navigation Bar (Top Navbar) for quick switching between admin views.
- Header Elements: Logo/Title, main section links, and an aligned Logout action button.

### Visual Identity & Theme
- Theme: Modern Dark Mode
- Primary Background: Dark slate/charcoal background (bg-slate-900)
- Containers & Cards: Elevated dark surfaces with crisp borders (bg-slate-800, border-slate-700)
- Accent & Status Colors: 
  - Primary Action / Accent: Indigo/Blue (indigo-600)
  - Success / Approved: Emerald/Green (emerald-500)
  - Warning / Pending: Amber/Yellow (amber-500)
  - Danger / Delete / Reject: Rose/Red (rose-600)
- Typography: High-contrast, clean sans-serif (text-slate-100, text-slate-400)

### Data Display & Component Patterns
- Card-Based UI: Appointments, services, and employees are presented as structured cards with rounded corners and subtle drop shadows rather than dense data tables.
- Initial View: Direct redirect to Pending Appointments upon login for immediate action on incoming requests.
- Form Patterns (CRUD): "Add New" actions trigger popup modals or expandable overlays to maintain a clean page layout without constant form clutter.

## 3. Implementation Roadmap
1. Style AdminLayout top navigation bar and global dark theme setup.
2. Refactor AppointmentsPage (Pending) and ApprovedAppointmentsPage into responsive appointment cards.
3. Transform ServicesManagement and EmployeesManagement into card lists with modal forms for creation.