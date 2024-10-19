# Toolkit

## Introduction
Toolkit is a project that provides various tools and utilities. It is designed to help developers perform everyday tasks more easily.

## Install
```shell
npm install @trinitytime/toolkit
```


## Example

### chain
```typescript
const add = (a: number, b: number) => a + b
const square = (x: number) => x * x
const chained = chain(add, square)

const result = chained(2, 3) // 25
```


### chainAsync
```typescript
const add = async (a: number, b: number) => a + b
const square = async (x: number) => x * x
const chained = chainAsync(add, square)

const result = await chained(2, 3) // 25
```

### arrayChain
```typescript
const add = (a: number) => a + 1
const square = (x: number) => x * x
const chained = arrayChain(add, square)

const result = chained(2, 3) // 25
```


### arrayChainAsync
```typescript
const add = async (a: number) => a + 1
const square = async (x: number) => x * x
const chained = arrayChainAsync(add, square)

const result = await chained(2, 3) // 25
```


### compose
```typescript
const middleware = [
  async (ctx: any, next: () => Promise<any>) => {
    ctx.arr.push(1)
    await next()
    ctx.arr.push(6)
  },
  async (ctx: any, next: () => Promise<any>) => {
    ctx.arr.push(2)
    await next()
    ctx.arr.push(5)
  },
  async (ctx: any, next: () => Promise<any>) => {
    ctx.arr.push(3)
    await next()
    ctx.arr.push(4)
  },
]

const fn = compose(middleware)
const ctx = { arr: [] }
await fn(ctx)

// ctx.arr  [1, 2, 3, 4, 5, 6]
```



## License
This project is distributed under the MIT License. See the `LICENSE` file for more details.
