---
title: LazyPromise
description: 惰性 Promise 容器，延迟到首次消费才执行 executor。
---

# LazyPromise

`@ai-zen/lazy-promise` 是一个以 TypeScript 实现的**惰性 Promise（LazyPromise）**容器。它把 executor 的**执行时机**从「创建 Promise 时」推迟到「首次被消费时」。

## 解决的问题

原生 `new Promise(executor)` 会在**创建时立即**执行 `executor`。但在某些场景（例如：预注册回调却不确定是否会被用到、按需初始化资源、条件性任务）下，我们更希望**真正用到时才执行**。`LazyPromise` 正是为此设计。

## 核心概念

- **惰性执行**：创建实例时不会执行 executor；仅当调用 `then` / `catch` / `finally` 时才初始化内部 `Promise`。
- **单次初始化**：内部 `Promise` 只在首次消费时初始化一次，后续对 `then` / `catch` / `finally` 的调用都复用同一个底层 Promise。
- **标准 Promise API**：对外暴露与原生 Promise 一致的 `then` / `catch` / `finally`，可无缝接入 `await` 与 Promise 链。

## 环境要求

- 支持 ESM（`import`）的 Node.js 环境（包 `type` 为 `module`，入口为 `dist/index.js`）。
- 说明：`package.json` 未声明 `engines` 字段，具体 Node 版本未固定。**需人工复核**建议的最低版本。

## 安装

```bash
npm install @ai-zen/lazy-promise
```

## 快速示例

```js
import LazyPromise from "@ai-zen/lazy-promise";

const lazy = new LazyPromise((resolve) => {
  // 仅当访问 lazy.then(...) / lazy.catch(...) / lazy.finally(...) 时才执行
  console.log("executor 执行");
  resolve("hello");
});

console.log("创建后立即打印"); // 先输出；此时 executor 不会执行

await lazy; // 触发惰性初始化
```

## 参考

- [快速开始](./getting-started.md)
- [API 参考](./api/index.md)

## License

MIT
