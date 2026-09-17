# Node.js & Backend Architecture

## 1. Node.js Event Loop Deep Dive
Node.js is a single-threaded, non-blocking, asynchronous, concurrent environment.
- The **Event Loop** is what allows Node.js to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded.
- **Phases of the Event Loop:**
  1. *Timers:* executes callbacks scheduled by `setTimeout()` and `setInterval()`.
  2. *Pending Callbacks:* executes I/O callbacks deferred to the next loop iteration.
  3. *Idle, Prepare:* only used internally.
  4. *Poll:* retrieve new I/O events; execute I/O related callbacks.
  5. *Check:* `setImmediate()` callbacks are invoked here.
  6. *Close Callbacks:* e.g., `socket.on('close', ...)`.

## 2. Streams and Buffers
- **Buffer:** A temporary memory location in RAM that gathers data. Buffers handle binary data directly.
- **Streams:** Collections of data (like arrays or strings) that might not be available all at once and don't have to fit in memory. Good for handling large files.
  - *Types:* Readable, Writable, Duplex (both read/write), Transform (modify data as it is written/read).

## 3. Worker Threads
Because Node.js is single-threaded, CPU-intensive tasks (like image processing or heavy cryptography) can block the Event Loop. 
- The `worker_threads` module enables the use of threads that execute JavaScript in parallel, allowing Node to handle CPU-bound tasks without blocking the main thread.

## 4. Express.js Middleware
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
- Used for logging, authentication, error handling, and parsing request bodies.
