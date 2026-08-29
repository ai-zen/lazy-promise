---
title: Quick Start
description: Installation and usage examples.
---

# Quick Start

This page demonstrates how to install and use `@ai-zen/lazy-promise`.

## Environment requirements

- A Node.js environment that supports ESM (`import`).
- Any one of the npm / pnpm / yarn package managers.
- Note: `package.json` does not declare `engines`, so the Node version is not fixed. **Requires manual review**.

## Installation

```bash
npm install @ai-zen/lazy-promise
```

## Import

```js
import LazyPromise from "@ai-zen/lazy-promise";
```

## Basic usage

```js
const lazy = new LazyPromise((resolve) => {
  console.log("executor executes");
  resolve("done");
});

lazy.then((value) => {
  console.log(value); // "done"
});
```

## Lazy verification

```js
const lazy = new LazyPromise((resolve) => {
  console.log("executor executes");
  resolve(42);
});

console.log("printed immediately after creation"); // output first; the code does not enter the executor here
await lazy; // triggers lazy initialization, outputs "executor executes"
```

## Supporting `await`

Because it implements `then`, `LazyPromise` can be awaited:

```js
const value = await new LazyPromise((resolve) => resolve("ok"));
console.log(value); // "ok"
```

## References

- [Overview](./index.md)
- [API Reference](./api/index.md)
