<div align="center">

# PlacePrep

### A Modern Placement Tracker for Students

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/harshali-nikumbh/PlacePrep)
![GitHub repo size](https://img.shields.io/github/repo-size/harshali-nikumbh/PlacePrep)

Track applications, manage interviews, stay organized, and prepare smarter throughout your placement journey.

</div>

---

## 📌 Overview

PlacePrep is a full-stack placement management platform built to help students organize every stage of their recruitment process.

Instead of maintaining multiple spreadsheets, notes, and reminders, users can manage everything from a single dashboard.

---

## ✨ Features

### Authentication

- Email & Password Login
- Google OAuth Login
- Secure session management using Supabase Auth

### Dashboard

- Placement statistics
- Application status analytics
- Interactive charts
- Quick overview of placement progress

### Application Tracker

- Add applications
- Edit applications
- Delete applications
- Search by company or role
- Filter by application status

### Calendar

- Track important recruitment dates
- Interview scheduling
- OA reminders

### Profile Management

- Update profile information
- Personalized dashboard greeting

### Responsive Design

- Desktop optimized
- Mobile sidebar with hamburger menu
- Responsive layouts

### Better UX

- Toast notifications
- Confirmation modals
- Smooth animations
- Loading states

---

# Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 15 |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Charts | Recharts |
| Icons | Lucide React |
| Notifications | Sonner |

---

# 📂 Project Structure

```
PlacePrep
│
├── app/
│   ├── dashboard/
│   ├── auth/
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── CTA.tsx
│   └── DashboardPreview.tsx
│
├── lib/
│   └── supabase.ts
│
├── public/
│
├── types/
│
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/harshali-nikumbh/PlacePrep.git
```

Go inside the project

```bash
cd PlacePrep
```

Install dependencies

```bash
npm install
```

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Start the development server

```bash
npm run dev
```

---

# 📸 Screenshots

<img width="1888" height="782" alt="image" src="https://github.com/user-attachments/assets/ad84f725-3603-4a5a-a6dd-484814bbcac5" />
- Landing Page



<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/4a98f676-ed85-4835-ab31-069489433b53" />
- Dashboard



<img width="1917" height="891" alt="image" src="https://github.com/user-attachments/assets/94f48b70-c67c-4920-95d9-328c00508dc2" />
- Applications Page



<img width="1898" height="897" alt="image" src="https://github.com/user-attachments/assets/670bdc5b-b315-47ac-958f-09ab244cc3db" />
- Calendar



<img width="1257" height="895" alt="image" src="https://github.com/user-attachments/assets/dc48e183-d1ef-407d-9702-4b54f2ce311a" />
- Profile Page

---

# Future Enhancements

- Resume Builder
- AI Resume Review
- AI Interview Preparation
- Company-wise Analytics
- Email Reminders
- Dark/Light Theme
- Export Applications to CSV
- Placement Progress Timeline

---

# Security

- Supabase Authentication
- Protected Dashboard Routes
- Environment Variables
- Secure PostgreSQL Database

  
# What I Learned

While building PlacePrep, I gained hands-on experience with:

- Full-stack application development
- Authentication using Supabase
- CRUD operations
- PostgreSQL integration
- Responsive UI design
- State management using React Hooks
- Component-based architecture
- TypeScript
- API integration
- Deployment workflow with GitHub

---

# Author

**Harshali Nikumbh**

LinkedIn: https://www.linkedin.com/in/harshali-nikumbh-964465326/

GitHub: https://github.com/harshali-nikumbh

---

## ⭐ If you found this project helpful, consider giving it a star!
