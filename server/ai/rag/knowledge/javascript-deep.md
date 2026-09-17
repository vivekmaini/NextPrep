# JavaScript Interview Preparation

## var let const
var is function-scoped, can be redeclared and reassigned, and is hoisted with undefined. let is block-scoped, cannot be redeclared in the same scope, can be reassigned, and is hoisted but not initialised (temporal dead zone). const is block-scoped, cannot be redeclared or reassigned, but objects and arrays declared with const can have their contents modified. Best practice: use const by default, let when reassignment is needed, avoid var.

## Hoisting
JavaScript moves function declarations and variable declarations to the top of their scope before execution. Function declarations are fully hoisted and can be called before they appear in code. Variables declared with var are hoisted but initialised with undefined. Variables declared with let and const are hoisted but remain in the temporal dead zone until the declaration is reached, causing a ReferenceError if accessed before declaration. Function expressions and arrow functions are not hoisted like function declarations.

## Closures
A closure is a function that has access to variables from its outer (enclosing) function's scope even after the outer function has returned. Closures remember the environment in which they were created. Use cases: data privacy and encapsulation, creating factory functions, maintaining state in callbacks, implementing module pattern. Example: a counter function that returns an increment function which remembers the count variable. Common interview pitfall: closures in loops with var capture the same variable reference. Fix with let or an IIFE.

## Promises and Async Await
A Promise represents the eventual result of an asynchronous operation. States: pending (initial), fulfilled (resolved with a value), rejected (failed with a reason). Promise.then handles resolved values, .catch handles rejections, .finally runs regardless. Promise.all runs multiple promises in parallel and resolves when all resolve. Promise.race resolves with the first settled promise. Promise.allSettled waits for all promises to settle regardless of outcome. Async/await is syntactic sugar over promises. async function returns a promise. await pauses execution until the promise settles. Use try/catch for error handling with async/await. Avoid await inside loops when operations are independent, use Promise.all instead.

## Event Loop
JavaScript is single-threaded but handles asynchronous operations through the event loop. The call stack executes functions synchronously. When an async operation (setTimeout, fetch, IO) is encountered, it is delegated to the browser or Node.js runtime. Once the async operation completes, its callback is placed in the task queue (macrotask queue for setTimeout, setInterval) or microtask queue (for Promises, MutationObserver). The event loop checks if the call stack is empty, then processes all microtasks first, then one macrotask, then microtasks again. This is why Promise.then callbacks execute before setTimeout callbacks even if setTimeout has 0 delay.

## Prototypes and Inheritance
Every JavaScript object has a prototype, which is another object it inherits properties from. The prototype chain links objects together. When accessing a property, JavaScript looks at the object first, then its prototype, then the prototype's prototype, until null is reached. Object.create creates an object with a specified prototype. ES6 classes are syntactic sugar over prototype-based inheritance. The extends keyword creates a subclass. super calls the parent constructor. The constructor method initialises the object. Static methods belong to the class itself, not instances. instanceof checks if an object is an instance of a class.

## this Keyword
The value of this depends on how a function is called, not where it is defined. Global context: this refers to the window object (browser) or global object (Node.js). Object method: this refers to the object the method is called on. Constructor function: this refers to the newly created instance. Arrow functions: this is lexically bound to the enclosing scope and cannot be changed. call and apply invoke a function with a specific this value. bind creates a new function with this permanently set. Common pitfall: losing this when passing object methods as callbacks. Solution: use bind or arrow functions.

## Array Methods
map creates a new array by transforming each element. filter creates a new array with elements that pass a test. reduce accumulates all elements into a single value. forEach executes a function for each element but does not return a new array. find returns the first element that satisfies a condition. findIndex returns the index of the first matching element. some returns true if at least one element passes the test. every returns true if all elements pass the test. flat flattens nested arrays. flatMap maps and flattens in one step. sort sorts elements in place. slice returns a shallow copy of a portion. splice adds or removes elements in place.

## ES6 Plus Features
Destructuring: extract values from arrays or properties from objects. Spread operator (...) expands an iterable into individual elements. Rest parameters (...args) collect remaining arguments into an array. Template literals use backticks for string interpolation and multi-line strings. Default parameters provide fallback values. Optional chaining (?.) safely accesses nested properties without throwing errors. Nullish coalescing (??) returns the right operand if the left is null or undefined. Modules: import and export for code organisation. Symbol creates unique identifiers. Iterators and generators provide custom iteration behaviour.

## DOM Manipulation
The DOM (Document Object Model) represents the HTML page as a tree of nodes. Selecting elements: getElementById, querySelector, querySelectorAll, getElementsByClassName. Creating elements: createElement, createTextNode. Modifying elements: innerHTML, textContent, setAttribute, classList.add/remove/toggle, style property. Adding to DOM: appendChild, insertBefore, append. Removing: removeChild, remove. Event handling: addEventListener, event object, event.preventDefault, event.stopPropagation. Event delegation: attach a single event listener to a parent element and use event.target to identify the actual source. This is more efficient than attaching listeners to many child elements.

## Error Handling
try block contains code that might throw an error. catch block handles the error. finally block executes regardless of whether an error occurred. throw creates a custom error. Error types: TypeError (wrong type), ReferenceError (undefined variable), SyntaxError (invalid code), RangeError (out of range value). Custom error classes extend Error for domain-specific errors. In async code, unhandled promise rejections should be caught with .catch or try/catch with await. In Node.js, process.on('unhandledRejection') catches unhandled promise rejections globally. Always provide meaningful error messages for debugging.


### Deep Dive JavaScript Engine Mechanics
1. **The Event Loop (Micro vs Macro tasks)**: Promises (Microtasks) always execute before setTimeout/setInterval (Macrotasks). The engine clears the entire microtask queue before rendering or moving to the next macrotask.
2. **Closures under the hood**: A closure retains the lexical scope of its outer function even after it returns. Used heavily in currying and private module patterns.
3. **Hoisting Quirks**: `var` is hoisted and initialized with `undefined`. `let` and `const` are hoisted but remain in the 'Temporal Dead Zone' (TDZ) until evaluation.
