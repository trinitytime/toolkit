class ChainError<T> extends Error {
  ctx: T | null

  constructor(message: string, ctx: T | null) {
    super(message)
    this.name = 'ChainError'
    this.ctx = ctx
  }
}

export function chain<T extends (...args: any[]) => any, R>(input1: T): (...args: Parameters<T>) => Promise<R>

export function chain<T extends (...args: any[]) => any, R>(
  input1: T,
  input2: (input: R) => R | Promise<R>,
): (...args: Parameters<T>) => Promise<R>

export function chain<T extends (...args: any[]) => any, R>(
  input1: T,
  input2: (input: R) => R | Promise<R>,
  input3: (input: R) => R | Promise<R>,
): (...args: Parameters<T>) => Promise<R>

export function chain<T extends (...args: any[]) => any, R>(
  first: T,
  ...fns: Array<(arg: ReturnType<T>) => R | Promise<R>>
): (...args: Parameters<T>) => Promise<R> {
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return Promise.resolve(args)
      .then((args) => first.apply(null, args))
      .then((v) => fns.reduce((promise, f) => promise.then(f), Promise.resolve(v)))
  }
}

function test(a1: number, b2: number, c3: any): number {
  return a1 + b2 + c3
}

function add(v: number): number {
  return v + 1
}

function add2(v: number): number {
  return v + 1
}
type TestParameters = Parameters<typeof test> // [number, number, number]

const compute1 = chain(test)
const compute2 = chain(test, add)
const compute = chain(test, add, add2)
