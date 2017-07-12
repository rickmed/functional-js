import * as jsc from 'jsverify'
import {Functor} from '../Functor'
import * as R from 'ramda'

const id = <A>(a: A) => a

// generates values of any type
const anyArb = jsc.oneof([jsc.json, jsc.falsy, jsc.fn(jsc.bool)])

export type FunctorCtor<T, A> = (a: A) => Functor<T, A>

export function testFunctors<T, A>(
   Fname: string
  ,...ctrs: (FunctorCtor<T, A> | Functor<T, A>)[]
): void {

  for (let Functor of ctrs) {
    const name = typeof Functor === 'function' ? Functor.name : Functor._ctor

    // same as it(...)
    jsc.property(name + "'s Identity", anyArb, any => {
        const Fa = typeof Functor === 'function' ? Functor(any) : Functor
        return R.equals(Fa.map(id), Fa)
    })

    jsc.property(name + "'s Composition", jsc.bool, "bool -> string", "string -> number", (
       bool: A
      ,g: (a: A) => string
      ,f: (a: string) => number
    ) => {
      const Fa = typeof Functor === 'function' ? Functor(bool) : Functor
      return R.equals(Fa.map(g).map(f), Fa.map(x => f(g(x))))
    })

  }

}

describe('dummy', () => {
  it('dummy', () => {
    expect(true).toBe(true)
  } )
})
