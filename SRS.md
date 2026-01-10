1. Introduction
1.1 Purpose

The purpose of this Software Requirements Specification (SRS) document is to describe the functional and non-functional requirements of the KanBanFlow project.
This document is intended for developers, instructors, evaluators, and users to understand the system behavior and features.

1.2 Scope

KanBanFlow is a web-based project and task management system developed using the Kanban methodology.
It allows users to manage projects, create tasks, track progress visually, and improve productivity.

The system is designed to work efficiently on:

Mobile devices

Tablets

Laptops and desktops

1.3 Definitions, Acronyms, and Abbreviations
Term	Description
SRS	Software Requirements Specification
UI	User Interface
UX	User Experience
CRUD	Create, Read, Update, Delete
JWT	JSON Web Token
2. Overall Description
2.1 Product Perspective

KanBanFlow is a standalone web application developed using modern web technologies.
It follows a client-server architecture, where the frontend communicates with the backend through APIs.

2.2 Product Functions

The main functionalities of the system include:

User registration and login

Secure authentication

Project creation and management

Task creation, update, and deletion

Kanban board visualization

Responsive navigation

Logout and session handling

2.3 User Classes and Characteristics
User Type	Description
Visitor	Can access public pages such as Home and About
Registered User	Can log in and access the dashboard
Authenticated User	Can manage projects and tasks
2.4 Operating Environment

Operating Systems: Windows, Linux, macOS

Browsers: Chrome, Firefox, Edge

Devices: Mobile, Tablet, Desktop

Internet connection required

2.5 Design Constraints

The system requires a modern web browser

Authentication is required to access protected pages

Responsive design must be maintained

2.6 Tools and Technologies Used
Category	Tools / Technologies
Frontend	React.js
Styling	Tailwind CSS
State Management	Redux Toolkit
Routing	React Router
Icons	React Icons
Authentication	JWT
Development Tool	Visual Studio Code
Version Control	Git and GitHub
3. Functional Requirements
3.1 User Authentication

The system shall allow users to register with email and password.

The system shall allow users to log in securely.

The system shall allow users to log out.

3.2 Dashboard

The system shall display a dashboard after successful login.

The dashboard shall be accessible only to authenticated users.

3.3 Project Management

The system shall allow users to create projects.

The system shall allow users to view projects.

The system shall allow users to update project details.

The system shall allow users to delete projects.

3.4 Task Management

The system shall allow users to create tasks.

The system shall allow users to update tasks.

The system shall allow users to move tasks between columns.

The system shall allow users to delete tasks.

3.5 Navigation

The system shall provide a responsive navigation bar.

The system shall include a hamburger menu for mobile devices.

4. Non-Functional Requirements
4.1 Performance

The system shall load pages within acceptable time limits.

4.2 Security

The system shall protect user data.

The system shall restrict unauthorized access.

4.3 Usability

The system shall be easy to use.

The system shall support mobile-first design.

4.4 Reliability

The system shall handle errors gracefully.

4.5 Scalability

The system shall support future feature enhancements.

5. System Features
5.1 Responsive Design

The system adapts to mobile, tablet, and desktop screen sizes.

5.2 User Interface

Clean and modern interface

Dark theme support

Smooth animations

6. External Interface Requirements
6.1 User Interface

Web-based interface built using React and Tailwind CSS

6.2 Software Interface

REST APIs for backend communication

7. Future Enhancements

Team collaboration

Notifications

Real-time updates

8. Conclusion

KanBanFlow is a modern, responsive, and user-friendly project management system.
This SRS document defines the system requirements clearly and helps guide development and evaluation.