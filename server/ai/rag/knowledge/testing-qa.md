# Software Testing & QA Engineering

## 1. Types of Testing
- **Unit Testing:** Testing individual components or functions in isolation. Usually fast and mocks external dependencies. (Tools: Jest, Mocha)
- **Integration Testing:** Testing how different modules or services work together. (e.g., testing if a database query function actually retrieves data from a test DB).
- **End-to-End (E2E) Testing:** Testing the entire application flow from the user's perspective, running in a real browser environment. (Tools: Cypress, Playwright, Selenium).

## 2. Test-Driven Development (TDD)
A software development process relying on a very short development cycle:
1. **Red:** Write a failing test for a new feature.
2. **Green:** Write the minimum amount of code required to pass the test.
3. **Refactor:** Improve the code structure without changing its behavior.

## 3. Code Coverage
A measure used to describe the degree to which the source code is executed when a particular test suite runs.
- **Statement Coverage:** Has each statement been executed?
- **Branch Coverage:** Has each branch (if/else) been executed?
- **Function Coverage:** Has each function been called?
*Note:* 100% code coverage does not guarantee bug-free code, it only means all code was executed during testing.

## 4. Mocks, Stubs, and Spies
- **Dummy:** Objects passed around but never actually used (e.g., to satisfy parameter lists).
- **Stub:** Provide canned answers to calls made during the test.
- **Spy:** Stubs that also record some information based on how they were called (e.g., counting how many times a function was called).
- **Mock:** Objects pre-programmed with expectations which form a specification of the calls they are expected to receive.
