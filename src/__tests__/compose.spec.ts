import { describe, expect, it } from 'bun:test'
import { compose } from '../compose.ts'

describe('compose', () => {
  it('should compose middleware in the correct order', async () => {
    const arr: number[] = []
    const middleware = [
      async (ctx: any, next: () => Promise<any>) => {
        arr.push(1)
        await next()
        arr.push(6)
      },
      async (ctx: any, next: () => Promise<any>) => {
        arr.push(2)
        await next()
        arr.push(5)
      },
      async (ctx: any, next: () => Promise<any>) => {
        arr.push(3)
        await next()
        arr.push(4)
      },
    ]

    const fn = compose(middleware)
    await fn({}, async () => {})

    expect(arr).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should handle errors correctly', async () => {
    const middleware = [
      async (ctx: any, next: () => Promise<any>) => {
        throw new Error('Test error')
      },
    ]

    const fn = compose(middleware)

    try {
      await fn({}, async () => {})
    } catch (err) {
      expect(err).toEqual(new Error('Test error'))
    }
  })

  it('should call next if no middleware is provided', async () => {
    const fn = compose([])
    let called = false
    await fn({}, async () => {
      called = true
    })
    expect(called).toBe(true)
  })

  it('should throw an error if middleware is not an array', () => {
    expect(() => compose(null as any)).toThrow(TypeError)
  })

  it('should throw an error if middleware is not composed of functions', () => {
    expect(() => compose([{} as any])).toThrow(TypeError)
  })

  it('should not call next multiple times', async () => {
    const middleware = [
      async (ctx: any, next: () => Promise<any>) => {
        await next()
        await next()
      },
    ]

    const fn = compose(middleware)

    try {
      await fn({}, async () => {})
    } catch (err) {
      expect(err).toEqual(new Error('next() called multiple times'))
    }
  })
})
