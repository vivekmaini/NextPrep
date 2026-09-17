# React & Next.js Interview Guide

## 1. React Server Components (RSC) vs Client Components
- **Server Components:** Default in Next.js App Router. They render exclusively on the server, reducing the JavaScript bundle size sent to the client. Ideal for fetching data, accessing backend resources, and keeping sensitive info secure.
- **Client Components:** Rendered on the client side (and pre-rendered on the server). Defined using the `"use client"` directive. Necessary when using interactivity (onClick), hooks (useState, useEffect), or browser APIs.

## 2. Next.js App Router vs Pages Router
- **Pages Router:** The traditional Next.js routing system based on the `pages` directory. Uses `getServerSideProps` and `getStaticProps` for data fetching.
- **App Router:** Introduced in Next.js 13, based on the `app` directory. Supports React Server Components, nested layouts, streaming, and server actions.

## 3. Server Actions in Next.js
Server actions allow you to write asynchronous server-side functions that can be called directly from Client Components (e.g., in a `<form action={myAction}>`). They eliminate the need to manually build API endpoints for simple mutations.

## 4. Advanced React Hooks
- **useTransition:** Allows marking state updates as non-urgent, keeping the UI responsive during expensive rendering.
- **useId:** Generates unique IDs that are stable across the server and client, avoiding hydration mismatches.
- **useDeferredValue:** Lets you defer updating a part of the UI (like a search results list) so the user's typing isn't blocked.

## 5. React Fiber Architecture
React Fiber is the reconciliation engine in React 16+. Its main goal is to enable incremental rendering of the virtual DOM. It can pause, abort, or reuse work as new updates come in, prioritizing high-priority updates (like animations) over low-priority ones (like data fetching).
