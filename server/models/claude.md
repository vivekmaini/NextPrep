# CLAUDE.md

# NextPrep - AI Interview & Placement Preparation Platform

## Project Overview

NextPrep is an AI-powered placement preparation platform that helps students prepare for campus placements using AI.

Core Features:

- User Authentication
- Resume Analysis
- ATS Score
- AI Mock Interview
- Coding Test
- Aptitude Test
- Reports & Analytics
- Admin Panel

---

# Tech Stack

Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

Backend

- Node.js
- Express.js

Database

- PostgreSQL

Authentication

- JWT
- bcrypt

Validation

- Joi

AI

- Google Gemini API

Deployment

Frontend -> Vercel

Backend -> Render

Database -> Neon PostgreSQL

---

# Architecture

Always follow MVC Architecture.

Flow

Route

↓

Controller

↓

Service

↓

Model

↓

Database

Controllers must never contain SQL queries.

Business logic must stay inside Services.

Database queries must stay inside Models.

---

# Folder Structure

client/

src/

components/

common/

layout/

ui/

pages/

auth/

dashboard/

resume/

interview/

coding/

aptitude/

reports/

services/

routes/

context/

hooks/

styles/

utils/

constants/

server/

config/

controllers/

middleware/

models/

routes/

services/

validators/

utils/

---

# Backend Rules

Always create separate

Route

Controller

Service

Model

Validator

Never write SQL inside controllers.

Never write business logic inside routes.

Never connect PostgreSQL directly from controllers.

Always use async/await.

Always use try/catch.

---

# Database

Tables

users

resumes

interviews

interview_questions

coding_tests

aptitude_tests

reports

Use PostgreSQL only.

Never use MongoDB.

Never use Sequelize ORM.

Use Raw SQL (pg package).

---

# Authentication

Authentication uses

JWT

bcrypt

Protected Routes

Current APIs

POST /api/auth/register

POST /api/auth/login

Future APIs

GET /api/profile

PUT /api/profile

POST /api/logout

---

# Frontend Rules

Use Functional Components only.

Never use Class Components.

Always use Tailwind CSS.

Create reusable components.

Button

Input

Card

Modal

Loader

Navbar

Sidebar

Do not duplicate UI.

Use Context API for Authentication.

Use Axios for API Calls.

---

# Coding Standards

Use camelCase.

Use meaningful variable names.

Prefer reusable code.

Avoid duplicate code.

Always validate inputs.

Write clean and modular code.

---

# Error Handling

Always return JSON.

Example

{
  "success": false,
  "message": "Error Message"
}

Success

{
  "success": true,
  "message": "Operation Successful"
}

---

# AI Features

Resume Analysis

- ATS Score
- Resume Suggestions

Interview

- HR Questions
- Technical Questions
- AI Feedback

Reports

- Performance Analysis
- Improvement Suggestions

---

# Security

Use

JWT

bcrypt

Environment Variables

Protected Routes

Validate every request.

Hash passwords before saving.

Never expose secrets.

---

# Git Workflow

Branches

main

backend

frontend

admin

Every feature should have its own commit.

Example

git commit -m "Add login API"

git commit -m "Create dashboard UI"

---

# Team Responsibilities

Lead Developer

Backend

Database

Authentication

AI Integration

Final Integration

Frontend Developer

React

Tailwind

Pages

Components

Responsive Design

Documentation Developer

Admin Panel

Reports

Testing

SRS

PPT

Final Documentation

---

# UI Theme

Primary Color

#2563EB

Background

#F8FAFC

Card

White

Border Radius

Large

Buttons

Rounded

Modern

Minimal

Professional

---

# Dashboard Modules

Dashboard

Resume

Interview

Coding

Aptitude

Reports

Settings

Logout

---

# Future Scope

Voice Interview

Video Interview

Company Specific Interview

Placement Cell Dashboard

Mobile Application

Dark Mode

Multi-language Support

---

# AI Instructions

When generating code:

Follow MVC Architecture.

Use PostgreSQL.

Never use MongoDB.

Use React + Tailwind.

Create reusable components.

Generate production-quality code.

Avoid shortcuts.

Explain every important implementation.

Keep code scalable.

Always assume this project will be deployed in production.