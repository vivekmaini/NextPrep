# API Design: REST, GraphQL, and gRPC

## 1. RESTful API Principles
REST (Representational State Transfer) is an architectural style for designing networked applications.
- **Client-Server Architecture:** Separation of concerns between the UI and data storage.
- **Statelessness:** Each request from client to server must contain all of the information necessary to understand the request. The server cannot take advantage of any stored context on the server.
- **Cacheability:** Responses must define themselves as cacheable or not.
- **Uniform Interface:** Resource identification in requests (URIs), resource manipulation through representations (JSON/XML), self-descriptive messages, and hypermedia as the engine of application state (HATEOAS).

## 2. HTTP Methods & Status Codes
- **GET:** Retrieve a resource (Safe, Idempotent).
- **POST:** Create a new resource (Not Safe, Not Idempotent).
- **PUT:** Update/Replace an existing resource entirely (Not Safe, Idempotent).
- **PATCH:** Partially update a resource.
- **DELETE:** Remove a resource (Not Safe, Idempotent).
- **Status Codes:** 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).

## 3. GraphQL
A query language for APIs and a runtime for fulfilling those queries with your existing data.
- **Advantages over REST:** Prevents Over-fetching (getting more data than needed) and Under-fetching (having to make multiple requests to get necessary data). The client dictates exactly what data it needs.
- **Core Concepts:** 
  - *Queries:* Fetch data.
  - *Mutations:* Modify data.
  - *Subscriptions:* Listen for real-time updates via WebSockets.

## 4. gRPC (Google Remote Procedure Call)
A modern, open-source, high-performance RPC framework.
- Uses **HTTP/2** for transport and **Protocol Buffers (Protobuf)** as the interface description language.
- Much faster and more efficient than JSON/REST, making it ideal for microservices communication.
