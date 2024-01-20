# LazyPromise

LazyPromise is a TypeScript class that represents a lazy promise, which executes its executor function only when `then`, `catch`, or `finally` methods are called.

## Installation

Install LazyPromise using npm:

```bash
npm install @ai-zen/lazy-promise
```

## Usage

Import LazyPromise class into your project:

```javascript
import LazyPromise from "@ai-zen/lazy-promise";
```

Create a new instance of LazyPromise by passing an executor function:

```javascript
const lazyPromise = new LazyPromise((resolve, reject) => {
  // Perform asynchronous operations and then call resolve or reject
});
```

Use the `then` method to attach fulfillment and rejection handlers:

```javascript
lazyPromise.then(
  (value) => {
    // Handle the fulfilled promise
  },
  (reason) => {
    // Handle the rejected promise
  }
);
```

Use the `catch` method to attach a rejection handler:

```javascript
lazyPromise.catch((reason) => {
  // Handle the rejected promise
});
```

Use the `finally` method to attach a handler when the promise is settled:

```javascript
lazyPromise.finally(() => {
  // Perform cleanup or other operations
});
```

Note: The executor function will only be executed when one of the above methods is called.

## License

This project is licensed under the MIT License.
