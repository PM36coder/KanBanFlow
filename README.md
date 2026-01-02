# KanBanFlow
KanbanFlow – Software Requirements Specification (SRS)

1. Introduction

1.1 Purpose
The purpose of this Software Requirements Specification (SRS) is to define the functional and non-functional requirements for KanbanFlow, a full-stack MERN-based Kanban Task Management application. The system allows users to create, organize, update, and track tasks through an interactive drag-and-drop workflow with secure authentication and responsive UI.

1.2 Scope
KanbanFlow includes:
- User Authentication (Register, Login, Logout)
- Forgot Password + OTP Verification + Update Password
- Create, Read, Update, Delete Tasks (CRUD)
- Drag and Drop task movement (To Do, In Progress, Done)
- Status Dropdown for manual status change
- Mobile Responsive Kanban Board with horizontal scroll
- Dark Mode Support
- Redux Toolkit for state management
- Protected Routes using JWT double-cookie pattern
- Inline Editing of Tasks
- Confirmation Modals
- Delete All Tasks feature

1.3 Definitions
MERN – MongoDB, Express.js, React.js, Node.js  
DnD – Drag and Drop  
JWT – JSON Web Token  
CRUD – Create, Read, Update, Delete  

2. Overall Description

2.1 Product Perspective
KanbanFlow is a standalone full-stack web application with the following architecture:

Frontend:
- React + Vite
- TailwindCSS UI
- Redux Toolkit global state
- Responsive design (mobile/tablet/desktop)

Backend:
- Node.js + Express.js REST API
- JWT-based Auth
- MongoDB Atlas
- Nodemailer for OTP

2.2 Product Features (High-Level)
- Authentication (Register, Login, Logout, Forgot Password, OTP Verify, Reset Password)
- Task Management with CRUD operations
- Drag-and-Drop Task Movement
- Status Dropdown Update
- Inline Editing for Title + Description
- Responsive UI + Dark Mode
- Protected Routes
- Task Board with three columns:
  - To Do
  - In Progress
  - Done

3. Functional Requirements

3.1 Authentication Module
- Register: User can create an account.
- Login: Credentials validated, then authenticated.
- Forgot Password: OTP sent via email.
- Reset Password: Validate OTP and update password.
- Logout: Clear token cookies.
- Load User: Auto-load user on refresh using protected /auth/me route.

3.2 Task Management Module
- Create Task: Adds task to “To Do”.
- Fetch Tasks: Retrieve all tasks for logged-in user.
- Update Task: Update title, description, or status.
- Drag-and-Drop Update: Automatically updates status.
- Status Dropdown: Alternative to DnD for mobile.
- Inline Editing: Double-click to edit fields.
- Delete Task: Remove individual task.
- Delete All Tasks: Clear all tasks at once.

3.3 UI/UX Requirements
- Responsive design.
- Dark mode and light mode toggle.
- Smooth drag and drop.
- Confirmation modals for delete actions.
- Empty board onboarding.
- Mobile horizontal board scroll.

4. Non-Functional Requirements
- Security:
  - JWT HttpOnly cookies
  - Password hashing with bcrypt
  - OTP expiry
  - CORS protection

- Performance:
  - Fast rendering using memoization
  - Optimized Redux store
  - Quick drag-drop response

- Usability:
  - Intuitive interface
  - Keyboard-friendly
  - Accessible colors

5. Assumptions
- Users require internet access.
- Cookies enabled.
- Render/Netlify autosleep accepted.

6. Future Enhancements
- Real-time collaboration (Socket.io)
- Team boards
- Task tags/labels
- Activity logs
- Comments system

7. Conclusion
KanbanFlow provides a complete, modern and responsive task management experience with secure authentication and efficient workflows. This SRS defines all required features to maintain system reliability, usability, and performance.


