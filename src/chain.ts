type MultiFunc = (...arg: any[]) => any
type SingleFunc<T> = (arg: T) => T
type SingleAsyncFunc<T> = (arg: T) => Promise<T>


function isArrayChain<T>(funcs: MultiFunc[] | [SingleFunc<T>[]]): funcs is [SingleFunc<T>[]] {
  if (1 === funcs.length && Array.isArray(funcs[0])) {
    return true
  }
  
  return false
}

export function chain<T>(f1: SingleFunc<T>[]): SingleFunc<T>
export function chain<T1 extends any[], T2, T3>(f1: (...arg: T1) => T2, f2: (arg: T2) => T3): (...arg: T1) => T3
export function chain<T1 extends any[], T2, T3, T4>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
): (...arg: T1) => T4
export function chain<T1 extends any[], T2, T3, T4, T5>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
): (...arg: T1) => T5
export function chain<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
): (...arg: T1) => T6
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
): (...arg: T1) => T7
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
): (...arg: T1) => T8
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
): (...arg: T1) => T9
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
): (...arg: T1) => T10
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
  f10: (arg: T3) => T11,
): (...arg: T1) => T11
export function chain(...funcs: MultiFunc[] | [SingleFunc<any>[]]) {
  if (isArrayChain(funcs)) {
    const first = funcs[0]
    return (arg: any) => {
      return first.reduce((acc, fn) => fn(acc), arg)
    }
  }

  return (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}

export function chainAsync<T>(f1: SingleAsyncFunc<T>[]): SingleAsyncFunc<T>
export function chainAsync<T1 extends any[], T2, T3>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
): (...arg: T1) => Promise<T3>
export function chainAsync<T1 extends any[], T2, T3, T4>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
): (...arg: T1) => Promise<T4>
export function chainAsync<T1 extends any[], T2, T3, T4, T5>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
): (...arg: T1) => Promise<T5>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
): (...arg: T1) => Promise<T6>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
  f6: (arg: T6) => T7 | Promise<T7>,
): (...arg: T1) => Promise<T7>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
  f6: (arg: T6) => T7 | Promise<T7>,
  f7: (arg: T7) => T8 | Promise<T8>,
): (...arg: T1) => Promise<T8>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
  f6: (arg: T6) => T7 | Promise<T7>,
  f7: (arg: T7) => T8 | Promise<T8>,
  f8: (arg: T8) => T9 | Promise<T9>,
): (...arg: T1) => Promise<T9>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
  f6: (arg: T6) => T7 | Promise<T7>,
  f7: (arg: T7) => T8 | Promise<T8>,
  f8: (arg: T8) => T9 | Promise<T9>,
  f9: (arg: T9) => T10 | Promise<T10>,
): (...arg: T1) => Promise<T10>
export function chainAsync<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  f1: (...arg: T1) => T2 | Promise<T2>,
  f2: (arg: T2) => T3 | Promise<T3>,
  f3: (arg: T3) => T4 | Promise<T4>,
  f4: (arg: T4) => T5 | Promise<T5>,
  f5: (arg: T5) => T6 | Promise<T6>,
  f6: (arg: T6) => T7 | Promise<T7>,
  f7: (arg: T7) => T8 | Promise<T8>,
  f8: (arg: T8) => T9 | Promise<T9>,
  f9: (arg: T9) => T10 | Promise<T10>,
  f10: (arg: T10) => T11 | Promise<T11>,
): (...arg: T1) => Promise<T11>
export function chainAsync(...funcs: MultiFunc[] | [SingleFunc<any>[]]) {
  if (isArrayChain(funcs)) {
    const first = funcs[0]
    return async (arg: any) => {
      return Promise.resolve(arg).then((v) => first.reduce((promise, fn) => promise.then(fn), Promise.resolve(v)))
    }
  }

  return async (...args: any[]) => {
    return Promise.resolve(args)
      .then((args) => funcs[0](...args))
      .then((v) => funcs.slice(1).reduce((promise, f) => promise.then(f), Promise.resolve(v)))
  }
}

