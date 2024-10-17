import * as tt from '../chain.ts'

interface ContextType {
  a: string
}

function createValue() {
  return async (a: string): Promise<ContextType> => {
    return {
      a,
    }
  }
}

function replaceValue() {
  return async (ctx: ContextType): Promise<ContextType> => {
    return {
      a: ctx.a.replace('hello', 'world'),
    }
  }
}

function replaceValue2() {
  return async (ctx: ContextType): Promise<ContextType> => {
    console.log(ctx)
    // throw new Error('error')
    return {
      a: `hello ${ctx.a}`,
    }
  }
}

const compute = tt.chainAsync(createValue(), replaceValue(), replaceValue2())

const result = await compute('hello').catch((err) => {
  return err
})

console.log(result)

// const aaa = await Promise.resolve(1)
//   .then((v) => v + 1)12
//   .then((v) => {
//     throw new Error('error')
//   })
//   .catch((err) => {
//     console.log(2)
//     throw err
//   })
//   .then((v) => v + 1)
//   .catch((err) => {
//     console.log(3)
//   })

// console.log(aaa)
