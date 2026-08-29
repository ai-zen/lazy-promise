---
title: API 参考
description: LazyPromise 类及其成员说明。
---

# API 参考

`LazyPromise<T>` 是默认导出的泛型类。

## 构造器

`constructor(executor: LazyPromise<T>["executor"])`

- `executor`：`(resolve: (value: T) => void, reject: (reason?: any) => void) => void`

创建实例时**不会**立即执行 executor。

## 实例属性

### executor

类型：`(resolve: (value: T) => void, reject: (reason?: any) => void) => void`

构造时传入的 executor 函数。

### promise

类型：`Promise<T> | null`

内部持有的原生 Promise。未初始化时值为 `null`；首次触发 `then` / `catch` / `finally` 后非空。

## 实例方法

### then(onfulfilled?, onrejected?)

初始化内部 Promise 并返回 `Promise<T>`。

```js
lazy.then(
  (value) => { /* 处理 fulfilled */ },
  (reason) => { /* 处理 rejected */ }
);
```

### catch(onrejected?)

初始化内部 Promise 并返回 `Promise<T>`。

```js
lazy.catch((reason) => { /* 处理 rejected */ });
```

### finally(onfinally?)

初始化内部 Promise 并返回 `Promise<T>`。

```js
lazy.finally(() => { /* 清理 */ });
```

### initPromise()

内部方法：当 `this.promise` 为 `null` 时，用 `new Promise<T>(this.executor)` 初始化。仅在 `then` / `catch` / `finally` 内部调用，通常无需手动使用。

> 注：`initPromise` 在声明中为公开（`public`）方法，但语义上属于内部实现。实际使用请以 `then` / `catch` / `finally` 为准。

## 返回值类型说明

`then` / `catch` / `finally` 的声明返回类型为 `Promise<T>`（见 `dist/index.d.ts`）。源码中通过 `this.initPromise()` 保证内部 Promise 已初始化后，再使用 `this.promise?.then(...)` 返回结果。

## 实现行为注意点

- executor 只执行一次（首次触发 `initPromise` 时）。
- 若在 Promise 链上继续传递，返回值遵循原生 Promise 的行为。

## 参考

- [概述](./../index.md)
- [快速开始](./../getting-started.md)
