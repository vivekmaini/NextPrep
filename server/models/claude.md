# CLAUDE.md

# NextPrep - AI Interview & Placement Preparation Platform

## Project Overview

NextPrep is an AI-powered placement preparation platform designed to help students prepare for campus placements through resume analysis, job matching, AI-assisted mock interviews, coding tests, aptitude tests, reports, analytics, and personalized recommendations.

The project must be treated as a real software engineering and AI/ML project, not as a simple wrapper around an external LLM API.

### Core Features

- User Authentication
- User Profile
- Resume Upload and Parsing
- Resume Analysis
- ATS-style Resume Score
- Resume–Job Description Matching
- Skill Extraction
- AI Mock Interview
- HR Questions
- Technical Questions
- AI Answer Evaluation
- Coding Test
- Aptitude Test
- Reports & Analytics
- Personalized Recommendations
- Admin Panel
- Placement Knowledge Base
- RAG-based contextual preparation

---

# Final AI Strategy

## Important Rule

**Do NOT directly call Gemini, OpenAI, Claude, or any other hosted LLM API as the core AI implementation.**

The goal is to build a **custom NextPrep AI pipeline using locally runnable/open-source pretrained models and our own orchestration, retrieval, scoring, and recommendation logic.**

The project should demonstrate actual AI/ML engineering rather than:

```text
User Input -> External LLM API -> Response
```

Instead, use:

```text
User Input
    ↓
Input Processing
    ↓
Specialized NLP / ML Models
    ↓
Embeddings
    ↓
Knowledge Retrieval / RAG
    ↓
Local LLM
    ↓
NextPrep AI Orchestrator
    ↓
Custom Scoring Engine
    ↓
Recommendation Engine
    ↓
Structured Result
    ↓
PostgreSQL
```

## AI Architecture

NextPrep uses a modular AI architecture inspired by production-style AI pipelines.

```text
                    USER
                     │
                     ▼
              React Frontend
                     │
                     ▼
              Node.js Backend
                     │
                     ▼
            NextPrep AI Orchestrator
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Resume AI    Interview AI   Matching AI
        │            │            │
        ▼            ▼            ▼
   Local NLP      Local LLM   Local Embedding
     Model          Model         Model
        │            │            │
        └────────────┼────────────┘
                     ▼
                RAG Pipeline
                     │
                     ▼
             PostgreSQL + pgvector
                     │
                     ▼
             Custom Scoring Engine
                     │
                     ▼
             Recommendation Engine
                     │
                     ▼
                Final Report
```

---

# AI Components

## 1. Local LLM

Use a pretrained open-source LLM that can run locally or on a dedicated inference service.

The model is a component of the system, not the entire system.

Possible model families may include:

- Llama-family instruct models
- Qwen-family instruct models
- Mistral-family instruct models
- Other suitable open-source instruct models

The exact model must be selected according to available RAM/VRAM, inference speed, licensing, and evaluation quality.

### Rules

- Do not hard-code the project around one model.
- Keep the LLM behind an internal service interface.
- Model selection must be configurable.
- The frontend must never communicate directly with the model.
- AI outputs must be validated before being used by the application.
- Prefer structured JSON output for application-level AI responses.
- Store model name/version in configuration for reproducibility.

Example internal interface:

```text
aiService.generate()
aiService.evaluate()
aiService.explain()
aiService.generateQuestions()
```

The rest of the application should not depend directly on a specific model library.

---

# 2. Embedding Model

Use a local pretrained embedding model for semantic search and matching.

Primary uses:

- Resume embedding
- Job description embedding
- Skill/document embedding
- Knowledge-base embedding
- Interview preparation retrieval
- Semantic similarity

Pipeline:

```text
Resume
   ↓
Embedding Model
   ↓
Vector

Job Description
   ↓
Embedding Model
   ↓
Vector

Vector Similarity
   ↓
Semantic Match Score
```

Do not use the generative LLM for basic vector similarity calculations.

---

# 3. Resume NLP Pipeline

Resume processing must be modular.

```text
PDF / DOCX
    ↓
Text Extraction
    ↓
Resume Cleaning
    ↓
Section Detection
    ↓
Skill Extraction
    ↓
Entity / Information Extraction
    ↓
Structured Resume JSON
```

Expected structured information:

```text
Name
Contact
Education
Experience
Projects
Skills
Certifications
Achievements
Languages
Tools
```

The pipeline should preserve the original extracted text and the structured representation separately.

---

# 4. Skill Extraction

Create a dedicated skill extraction pipeline.

Example:

```text
"Built REST APIs using Node.js and PostgreSQL"

        ↓

Node.js       -> Technical Skill
PostgreSQL    -> Technical Skill
REST API      -> Technology / Concept
```

Use a combination of:

- Skill taxonomy
- Rule-based matching
- NLP processing
- Local model assistance where useful

Do not rely entirely on the LLM for skill extraction.

The skill taxonomy should be maintained as project data so that it can be expanded without retraining the entire system.

---

# 5. Resume–Job Matching

The matching system must combine semantic and deterministic signals.

```text
Resume
   │
   ├── Skills
   ├── Experience
   ├── Projects
   └── Education
          │
          ▼
      Embedding
          │
          ▼
Job Description
          │
          ├── Required Skills
          ├── Preferred Skills
          ├── Role
          └── Experience
          │
          ▼
      Embedding
          │
          ▼
Semantic Similarity
          +
Skill Rule Matching
          +
Experience Matching
          +
Education Matching
          ↓
     Final Match Score
```

The final score must be calculated by the **NextPrep Scoring Engine**, not generated directly by the LLM.

Example configurable score:

```text
Semantic Similarity     40%
Required Skill Match    30%
Experience Match        15%
Education Match         10%
Additional Skills        5%
```

These weights must remain configurable.

---

# 6. RAG Knowledge Base

NextPrep must include a placement-preparation knowledge base.

Possible content:

```text
Knowledge Base
│
├── HR Interview Questions
├── Technical Interview Questions
├── Java
├── Python
├── JavaScript
├── React
├── Node.js
├── PostgreSQL
├── DSA
├── Aptitude
├── Resume Guidelines
├── ATS Guidelines
├── Job Roles
├── Interview Preparation Material
└── Company-specific Preparation Material
```

Pipeline:

```text
Documents
    ↓
Text Extraction
    ↓
Cleaning
    ↓
Chunking
    ↓
Embedding Model
    ↓
Vectors
    ↓
PostgreSQL + pgvector
```

Query pipeline:

```text
User Query
    ↓
Query Embedding
    ↓
Vector Search
    ↓
Relevant Chunks
    ↓
Context Builder
    ↓
Local LLM
    ↓
Structured Response
```

RAG is required to reduce unsupported/generic responses and make the AI grounded in the project's own knowledge base.

---

# 7. NextPrep AI Orchestrator

The orchestrator is the central AI coordination layer.

It must combine outputs from:

- Resume Analysis
- Skill Extraction
- Resume–Job Matching
- Interview Evaluation
- Coding Performance
- Aptitude Performance
- RAG Knowledge Base
- User Profile
- Historical Performance

Example:

```text
Resume Score       = 72
Job Match          = 68
Interview Score    = 81
Coding Score       = 55
Aptitude Score     = 74

             ↓

      AI Orchestrator

             ↓

Weak Areas:
- DSA
- Backend Development

             ↓

Personalized Plan:
- Practice DSA
- Revise Node.js
- Practice PostgreSQL
- Take another technical interview
```

The orchestrator must not simply concatenate LLM responses.

It should:

1. Collect structured module outputs.
2. Validate the data.
3. Retrieve relevant knowledge when required.
4. Apply deterministic scoring.
5. Identify weaknesses.
6. Generate personalized recommendations.
7. Produce a final structured report.

---

# 8. Custom Scoring Engine

Create a dedicated scoring service.

The scoring engine handles deterministic calculations such as:

- ATS score
- Skill match score
- Interview component scores
- Coding score
- Aptitude score
- Overall placement readiness score
- Topic-wise performance

The LLM should explain or provide qualitative feedback, but the core numerical calculations must remain in application logic.

Example:

```text
Resume Score
+
Job Match Score
+
Interview Score
+
Coding Score
+
Aptitude Score
        ↓
Overall Readiness Score
```

All scoring weights must be configurable and documented.

---

# 9. Recommendation Engine

The recommendation engine uses structured performance data.

Inputs:

```text
Resume Skills
Job Requirements
Interview Performance
Coding Performance
Aptitude Performance
Historical Scores
Weak Topics
User Target Role
```

Outputs:

```text
Weak Areas
Missing Skills
Recommended Topics
Recommended Questions
Recommended Practice Tests
Recommended Interview Type
Suggested Study Plan
```

Recommendations must be explainable.

Example:

```text
Recommendation:
Practice Node.js REST APIs.

Reason:
Backend-related questions were weak in the
last technical interview and Node.js is a
required skill for the selected job role.
```

---

# AI Design Principles

## Never Build

```text
Frontend
   ↓
Gemini API
   ↓
Output
```

## Build

```text
Frontend
   ↓
Backend
   ↓
AI Orchestrator
   ↓
Specialized Local AI Modules
   ↓
RAG
   ↓
Local LLM
   ↓
Custom Scoring
   ↓
Recommendations
   ↓
Database
```

The project must remain useful even if one AI component is temporarily unavailable.

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- pgvector

## Authentication

- JWT
- bcrypt

## Validation

- Joi

## AI / ML

- Local/open-source LLM
- Local embedding model
- NLP pipeline
- Resume parser
- Skill extraction
- RAG
- Custom AI Orchestrator
- Custom Scoring Engine
- Recommendation Engine

## Deployment

Frontend -> Vercel

Backend -> Render or equivalent Node.js hosting

Database -> Neon PostgreSQL with pgvector where supported

AI inference -> Dedicated/local inference service depending on selected model and available compute

---

# Architecture

Always follow MVC Architecture.

Flow:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
```

AI flow:

```text
Route
  ↓
Controller
  ↓
AI Service
  ↓
AI Orchestrator
  ↓
Specialized AI Module
  ↓
Model / RAG / Scoring
  ↓
Structured Result
```

Controllers must never contain SQL queries.

Business logic must stay inside Services.

Database queries must stay inside Models.

AI orchestration must stay inside the AI/Service layer.

---

# Folder Structure

```text
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
    settings/

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

ai/
    llm/
        localLLMService.js
        modelConfig.js

    embeddings/
        embeddingService.js

    nlp/
        resumeParser.js
        skillExtractor.js

    resume/
        resumeAIService.js

    interview/
        interviewAIService.js

    matching/
        resumeJobMatchingService.js

    rag/
        documentLoader.js
        textChunker.js
        vectorStore.js
        retrievalService.js
        ragService.js

    scoring/
        scoringService.js

    recommendations/
        recommendationService.js

    orchestrator/
        nextprepAIOrchestrator.js

validators/

utils/
```

---

# Backend Rules

Always create separate:

- Route
- Controller
- Service
- Model
- Validator

Never write SQL inside controllers.

Never write business logic inside routes.

Never connect PostgreSQL directly from controllers.

Always use async/await.

Always use try/catch.

AI calls/inference must not be placed directly inside controllers.

AI functionality must be exposed through services.

---

# Database

Use PostgreSQL only.

Use raw SQL through the `pg` package.

Never use MongoDB.

Never use Sequelize ORM.

Use pgvector for vector storage/search where required.

## Core Tables

```text
users

resumes

job_descriptions

resume_skills

resume_matches

interviews

interview_questions

interview_answers

coding_tests

coding_submissions

aptitude_tests

aptitude_questions

aptitude_attempts

knowledge_documents

knowledge_chunks

embeddings / vector-enabled knowledge_chunks

reports

recommendations
```

Use primary keys and foreign keys appropriately.

Use indexes for frequently searched fields.

Use transactions for multi-step operations when consistency requires them.

---

# Authentication

Authentication uses:

- JWT
- bcrypt

Protected Routes

Current APIs:

```text
POST /api/auth/register
POST /api/auth/login
```

Future APIs:

```text
GET /api/profile
PUT /api/profile
POST /api/logout
```

Never store plaintext passwords.

---

# Frontend Rules

Use Functional Components only.

Never use Class Components.

Always use Tailwind CSS.

Create reusable components.

Reusable components include:

```text
Button
Input
Card
Modal
Loader
Navbar
Sidebar
Table
Badge
Progress
```

Do not duplicate UI.

Use Context API for Authentication.

Use Axios for backend API calls.

The frontend must never call the local AI model directly.

---

# AI API / Inference Rules

There must be **no direct dependency on hosted LLM APIs** for the core AI system.

Do not add:

```text
GEMINI_API_KEY
OPENAI_API_KEY
ANTHROPIC_API_KEY
```

unless explicitly approved later for an optional fallback/testing feature.

The preferred architecture is:

```text
Node.js
   ↓
Internal AI Service
   ↓
Local Model / Dedicated Inference Server
```

The application must communicate with the model through an internal abstraction.

This allows the model to be replaced without changing controllers or frontend code.

---

# Model Selection Rules

Do not select a model only because it is popular.

Evaluate candidates based on:

- RAM/VRAM requirement
- Inference speed
- Context length
- Structured output quality
- Resume analysis quality
- Interview evaluation quality
- Licensing
- Local deployment feasibility
- Hardware available to the team

Keep model configuration outside business logic.

Example:

```text
MODEL_NAME
MODEL_PATH
MODEL_CONTEXT_LENGTH
MODEL_TEMPERATURE
MODEL_MAX_TOKENS
```

Never hard-code model-specific details throughout the project.

---

# AI Output Rules

Prefer structured outputs.

Example:

```json
{
  "score": 78,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "recommendations": []
}
```

Always validate model output before storing or displaying it.

Handle:

- Empty output
- Invalid JSON
- Timeout
- Model unavailable
- Unexpected fields
- Incomplete response

Never trust model output as application logic without validation.

---

# Coding Assessment AI Rule

Coding correctness must be determined by actual code execution and test cases.

Do not ask the LLM whether code is correct and use that as the final score.

The LLM may be used for:

- Explanation
- Code quality feedback
- Complexity explanation
- Improvement suggestions

But correctness must come from the execution/testing system.

---

# Aptitude Assessment AI Rule

Aptitude scoring must be deterministic.

The system should calculate:

```text
Correct Answers
+
Incorrect Answers
+
Time / Attempt Information where applicable
        ↓
Final Score
```

The LLM may explain an answer but must not determine the official score.

---

# Interview Evaluation

Interview evaluation should use a defined rubric.

Possible criteria:

```text
Technical Accuracy
Communication
Relevance
Problem Solving
Confidence Indicators
Completeness
Structure
```

The final numerical score should be produced by the scoring engine from structured evaluation values.

Example:

```json
{
  "technicalAccuracy": 8,
  "relevance": 7,
  "communication": 8,
  "problemSolving": 6,
  "overall": 72,
  "strengths": [],
  "improvements": []
}
```

---

# Resume ATS Evaluation

ATS scoring must combine deterministic checks and AI-assisted analysis.

Possible components:

```text
Keyword / Skill Match
Resume Structure
Section Completeness
Experience Relevance
Education Relevance
Project Relevance
Formatting Signals
Job Description Match
```

The final score must be calculated by the NextPrep scoring service.

---

# Security

Use:

- JWT
- bcrypt
- Environment Variables
- Protected Routes
- Role-based Authorization
- Input Validation
- File Validation

Never expose secrets.

Never expose database credentials.

Never send internal model configuration unnecessarily to the client.

Validate uploaded resume files.

Limit file size and supported file types.

Sanitize extracted document content before processing.

---

# Error Handling

Always return JSON.

Example:

```json
{
  "success": false,
  "message": "Error Message"
}
```

Success:

```json
{
  "success": true,
  "message": "Operation Successful",
  "data": {}
}
```

AI-specific failures should return controlled errors.

Do not expose stack traces or sensitive implementation details in production responses.

---

# Reports

Reports should be generated from stored structured data.

Do not repeatedly call an LLM to calculate historical scores.

Reports may include:

```text
Resume Score
Job Match Score
Interview Score
Coding Score
Aptitude Score
Overall Readiness
Strengths
Weak Areas
Missing Skills
Recommended Topics
Progress Over Time
```

---

# Dashboard Modules

```text
Dashboard
Resume
Interview
Coding
Aptitude
Reports
Settings
Logout
```

---

# Admin Panel

Admin functionality:

- Admin Login
- Manage Users
- Manage Questions
- Manage Interview Questions
- Manage Coding Problems
- Manage Aptitude Tests
- Manage Knowledge Base
- Manage Skills Taxonomy
- Manage Companies
- View Analytics
- Generate Reports

Admin APIs must be protected by role-based authorization.

---

# Testing Strategy

Testing must cover:

## Backend

- Unit Tests
- Controller Tests
- Service Tests
- Model/Database Tests
- API Tests
- Authentication Tests

## Frontend

- Component Tests
- Page Tests
- Form Validation Tests
- API Integration Tests

## AI

- Resume parsing tests
- Skill extraction tests
- Embedding/matching tests
- RAG retrieval tests
- Structured output tests
- Interview evaluation tests
- Recommendation tests
- Model failure tests

## AI Evaluation Dataset

Create a small project-owned evaluation dataset.

Examples:

```text
Resume A + Job A -> expected matching range
Resume B + Job B -> expected matching range
Interview Answer A -> expected rubric range
Interview Answer B -> expected rubric range
Skill Extraction examples
```

Do not claim model accuracy without actual evaluation evidence.

---

# AI Quality Principles

The system must distinguish between:

### Deterministic

- Aptitude score
- Coding test correctness
- Vector similarity calculation
- Weighted final score
- Database calculations

### AI-Assisted

- Resume explanation
- Interview feedback
- Question generation
- Recommendation wording
- Semantic interpretation

### Retrieval-Based

- Knowledge-base answers
- Interview preparation material
- Company/role preparation
- Relevant learning resources

This separation makes the system more explainable and easier to test.

---

# Git Workflow

Branches:

```text
main
backend
frontend
admin
ai
```

Every feature should have its own commit.

Examples:

```text
git commit -m "Add login API"

git commit -m "Create resume parser"

git commit -m "Add local embedding pipeline"

git commit -m "Implement pgvector retrieval"

git commit -m "Add AI interview orchestrator"

git commit -m "Add custom scoring engine"
```

---

# Team Responsibilities

## Lead Developer

- Backend
- Database
- Authentication
- AI architecture
- AI orchestrator
- Model integration
- Final integration

## Frontend Developer

- React
- Tailwind
- Pages
- Components
- Responsive Design
- Dashboard UI

## Documentation / Testing Developer

- Admin Panel
- Reports
- Testing
- SRS
- PPT
- Final Documentation
- Evaluation Dataset
- AI Testing Documentation

Team responsibilities may be adjusted as implementation progresses.

---

# UI Theme

Primary Color:

```text
#2563EB
```

Background:

```text
#F8FAFC
```

Card:

```text
White
```

Style:

- Large border radius
- Rounded buttons
- Modern
- Minimal
- Professional
- Responsive

---

# Development Principles

Always:

- Write production-quality code.
- Keep modules independent.
- Prefer reusable code.
- Avoid duplicate code.
- Validate inputs.
- Use meaningful variable names.
- Keep AI components replaceable.
- Keep numerical scoring deterministic.
- Document important AI decisions.
- Keep model configuration separate.
- Make errors recoverable.
- Assume the project will be demonstrated in a college major-project evaluation.

Do not:

- Add unnecessary dependencies.
- Put SQL inside controllers.
- Put business logic inside routes.
- Put AI inference directly in React components.
- Hard-code API keys.
- Hard-code model-specific logic throughout the codebase.
- Use an LLM as a replacement for deterministic algorithms.
- Claim that a model is custom-trained unless it actually has been trained/fine-tuned by the project team.

---

# Project Development Phases

The development window is:

```text
15 July 2026 → 23 September 2026
```

Major phases:

```text
Phase 0 - Planning & Requirement Analysis
Phase 1 - Database & Backend Foundation
Phase 2 - Authentication & User Management
Phase 3 - Frontend Foundation
Phase 4 - Resume Processing & ATS
Phase 5 - AI/ML Pipeline
Phase 6 - AI Mock Interview
Phase 7 - Coding & Aptitude
Phase 8 - Reports & Recommendation Engine
Phase 9 - Admin Panel & Knowledge Base
Phase 10 - Integration & Testing
Phase 11 - Deployment & Documentation
```

The detailed Gantt chart is maintained separately.

---

# Final AI Architecture Decision

This is the approved architecture for NextPrep:

```text
                NEXT PREP AI SYSTEM

                     User
                       │
                       ▼
                React Frontend
                       │
                       ▼
                Node/Express API
                       │
                       ▼
              AI Orchestrator
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
 Resume NLP       Interview AI     Job Matching
       │               │                │
       ▼               ▼                ▼
 Local NLP         Local LLM       Local Embeddings
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                 RAG Pipeline
                       │
                       ▼
              PostgreSQL + pgvector
                       │
                       ▼
              Custom Scoring Engine
                       │
                       ▼
             Recommendation Engine
                       │
                       ▼
                 Final Report
```

## Core Principle

**NextPrep is not an LLM wrapper.**

It is a modular AI system where the LLM is only one component inside a larger pipeline consisting of:

```text
NLP
+
Local Models
+
Embeddings
+
Vector Search
+
RAG
+
AI Orchestration
+
Custom Scoring
+
Recommendation Engine
+
PostgreSQL
```

The system should remain functional and architecturally meaningful even if the generative model is replaced by another local model.

---

# Future Scope

- Voice Interview
- Video Interview Analysis
- Company-Specific Interview Simulation
- Advanced RAG
- More domain-specific local models
- Fine-tuned placement-domain models after collecting sufficient validated training data
- Placement Cell Dashboard
- Mobile Application
- Dark Mode
- Multi-language Support
- Advanced Career Recommendation
- Job Recommendation
- Local model optimization
- Quantized model deployment
- Model evaluation dashboard

---

# Important Final Note

Do not claim that NextPrep has trained its own LLM from scratch.

The correct technical description is:

> "NextPrep uses locally deployed pretrained/open-source AI models as building blocks and adds a custom placement-domain AI pipeline, retrieval system, orchestration layer, scoring engine, and recommendation system."

If a model is later fine-tuned using a project-created/curated dataset, document the dataset, training method, evaluation procedure, model version, and measurable results before calling it a fine-tuned NextPrep model.
