---
title: API Reference
description: LazyPromise class and its members.
---

# API Reference

`LazyPromise<T>` is a generic class that is the default export.

## Constructor

`constructor(executor: LazyPromise<T>["executor"])`

- `executor`: `(resolve: (value: T) => void, reject: (reason?: any) => void) => void`

Creating an instance does **not** immediately execute the executor.

## Instance properties

### executor

Type: `(resolve: (value: T) => void, reject: (reason?: any) => void) => void`

The executor function passed to the constructor.

### promise

Type: `Promise<T> | null`

The internal native Promise. Its value is `null` when not initialized; it becomes non-null after `then` / `catch` / `finally` is triggered for the first time.

## Instance methods

### then(onfulfilled?, onrejected?)

Initializes the internal Promise and returns `Promise<T>`.

```js
lazy.then(
  (value) => { /* handle fulfilled */ },
  (reason) => { /* handle rejected */ }
);
```

### catch(onrejected?)

Initializes the internal Promise and returns `Promise<T>`.

```js
lazy.catch((reason) => { /* handle rejected */ });
```

### finally(onfinally?)

Initializes the internal Promise and returns `Promise<T>`.

```js
lazy.finally(() => { /* cleanup */ });
```

### initPromise()

Internal method: initializes with `new Promise<T>(this.executor)` when `this.promise` is `null`. It is invoked only inside `then` / `catch` / `finally` and usually does not need to be used manually.

> Note: `initPromise` is declared as a public method, but semantically it is an internal implementation. For actual use, please refer to `then` / `catch` / `finally`.

## Return type notes

The declared return types of `then` / `catch` / `finally` are `Promise<T>` (see `dist/index.d.ts`). In the source, the internal Promise is guaranteed to be initialized via `this.initPromise()`, and then the result is returned using `this.promise?.then(...)`.

## Implementation behavior notes

- The executor is executed only once (when `initPromise` is triggered for the first time).
- If continued on the Promise chain, the return value follows the native Promise behavior.

## References

- [Overview](./../index.md)
- [Quick Start](./../getting-started.md)
