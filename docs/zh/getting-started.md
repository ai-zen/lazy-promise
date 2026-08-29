---
title: 快速开始
description: 安装与使用示例。
---

# 快速开始

本页演示如何安装并使用 `@ai-zen/lazy-promise`。

## 环境要求

- 支持 ESM（`import`）的 Node.js 环境。
- npm / pnpm / yarn 任一包管理器。
- 说明：`package.json` 未声明 `engines`，Node 版本未固定。**需人工复核**。

## 安装

```bash
npm install @ai-zen/lazy-promise
```

## 导入

```js
import LazyPromise from "@ai-zen/lazy-promise";
```

## 基本用法

```js
const lazy = new LazyPromise((resolve) => {
  console.log("executor 执行");
  resolve("done");
});

lazy.then((value) => {
  console.log(value); // "done"
});
```

## 惰性验证

```js
const lazy = new LazyPromise((resolve) => {
  console.log("executor 执行");
  resolve(42);
});

console.log("创建后立即打印"); // 先输出；此时代码不会进入 executor
await lazy; // 触发惰性初始化，输出 "executor 执行"
```

## 支持 `await`

由于实现了 `then`，`LazyPromise` 可以被 `await`：

```js
const value = await new LazyPromise((resolve) => resolve("ok"));
console.log(value); // "ok"
```

## 参考

- [概述](./index.md)
- [API 参考](./api/index.md)
