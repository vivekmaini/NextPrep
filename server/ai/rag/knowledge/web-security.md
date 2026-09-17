# Web Security & CyberSecurity Basics

## 1. Cross-Site Scripting (XSS)
XSS occurs when an attacker injects malicious executable scripts into the code of a trusted application or website.
- **Reflected XSS:** The script comes from the current HTTP request (e.g., in a URL parameter).
- **Stored XSS:** The script is permanently stored on the target server (e.g., in a database via a comment field).
- **Prevention:** Always escape/sanitize user input before rendering it in the browser. Modern frameworks like React handle basic XSS prevention automatically by escaping string variables.

## 2. Cross-Site Request Forgery (CSRF)
CSRF tricks the victim into submitting a malicious request to a web application where they are currently authenticated.
- **Example:** An attacker places a hidden image tag on a forum: `<img src="http://bank.com/transfer?amount=10000&to=attacker">`. If the user is logged into their bank, the browser auto-sends the session cookies.
- **Prevention:** Use Anti-CSRF tokens (Synchronizer Token Pattern) or `SameSite` cookie attributes.

## 3. SQL Injection (SQLi)
SQLi occurs when user input is improperly sanitized and then passed directly to a database query, allowing attackers to execute arbitrary SQL commands.
- **Prevention:** Always use Parameterized Queries (Prepared Statements) or an ORM. Never concatenate strings to build SQL queries.

## 4. Content Security Policy (CSP)
An added layer of security that helps detect and mitigate certain types of attacks, including XSS and data injection attacks. It is implemented via a HTTP response header `Content-Security-Policy` that restricts where scripts can be loaded from.

## 5. JWT (JSON Web Tokens) Security
- Never store sensitive data (like passwords) in the payload, as it is only base64 encoded, not encrypted.
- Store JWTs securely. If stored in `localStorage`, they are vulnerable to XSS. If stored in `httpOnly` cookies, they are protected from XSS but require CSRF protection.
