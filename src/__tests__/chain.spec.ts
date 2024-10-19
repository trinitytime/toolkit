import { describe, expect, it } from 'bun:test'
import { arrayChain, arrayChainAsync, chain, chainAsync } from '../chain'

describe('chain', () => {
  it('should chain two functions', () => {
    const add = (a: number, b: number) => a + b
    const square = (x: number) => x * x
    const chained = chain(add, square)
    expect(chained(2, 3)).toBe(25)
  })

  it('should chain three functions', () => {
    const add = (a: number, b: number) => a + b
    const square = (x: number) => x * x
    const subtract = (x: number) => x - 10
    const chained = chain(add, square, subtract)
    expect(chained(2, 3)).toBe(15)
  })
})

describe('chainAsync', () => {
  it('should chain two async functions', async () => {
    const add = async (a: number, b: number) => a + b
    const square = async (x: number) => x * x
    const chained = chainAsync(add, square)
    expect(await chained(2, 3)).toBe(25)
  })

  it('should chain three async functions', async () => {
    const add = async (a: number, b: number) => a + b
    const square = async (x: number) => x * x
    const subtract = async (x: number) => x - 10
    const chained = chainAsync(add, square, subtract)
    expect(await chained(2, 3)).toBe(15)
  })
})

describe('arrayChain', () => {
  it('should chain an array of functions', () => {
    const funcs = [(x: number) => x + 1, (x: number) => x * 2, (x: number) => x - 3]
    const chained = arrayChain(funcs)
    expect(chained(5)).toBe(9)
  })
})

describe('arrayChainAsync', () => {
  it('should chain an array of async functions', async () => {
    const funcs = [async (x: number) => x + 1, async (x: number) => x * 2, async (x: number) => x - 3]
    const chained = arrayChainAsync(funcs)
    expect(await chained(5)).toBe(9)
  })
})
