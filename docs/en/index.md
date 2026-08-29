---
title: LazyPromise
description: A lazy Promise container that defers executing the executor until its first consumption.
---

# LazyPromise

`@ai-zen/lazy-promise` is a **lazy Promise (LazyPromise)** container implemented in TypeScript. It postpones the **execution timing** of the executor from "when the Promise is created" to "when it is first consumed".

## Problem it solves

The native `new Promise(executor)` executes the `executor` **immediately** upon creation. But in certain scenarios (such as: pre-registering callbacks without knowing whether they will be used, on-demand resource initialization, conditional tasks), we prefer **executing only when it is actually used**. `LazyPromise` is designed for this purpose.

## Core concepts

- **Lazy execution**: The executor is not executed when creating the instance; the internal `Promise` is initialized only when `then` / `catch` / `finally` is called.
- **Single initialization**: The internal `Promise` is initialized only once on first consumption; subsequent calls to `then` / `catch` / `finally` all reuse the same underlying Promise.
- **Standard Promise API**: Exposes `then` / `catch` / `finally` consistent with the native Promise, seamlessly interoperable with `await` and Promise chains.

## Environment requirements

- A Node.js environment that supports ESM (`import`) (the package `type` is `module` and the entry is `dist/index.js`).
- Note: `package.json` does not declare an `engines` field, so the specific Node version is not fixed. **Requires manual review** for the recommended minimum version.

## Installation

```bash
npm install @ai-zen/lazy-promise
```

## Quick example

```js
import LazyPromise from "@ai-zen/lazy-promise";

const lazy = new LazyPromise((resolve) => {
  // Only executed when accessing lazy.then(...) / lazy.catch(...) / lazy.finally(...)
  console.log("executor executes");
  resolve("hello");
});

console.log("printed immediately after creation"); // output first; the executor is not executed here

await lazy; // triggers lazy initialization
```

## References

- [Quick Start](./getting-started.md)
- [API Reference](./api/index.md)

## License

MIT
