import * as jsc from "jsverify"
import {Functor} from "../Functor"
import * as R from "ramda"

const id = <A>(a: A) => a

// generates values of any type
const anyArb = jsc.oneof([jsc.json, jsc.falsy, jsc.fn(jsc.bool)])

export type FunctorCtor<T, A> = (a: A) => Functor<T, A>

export function testFunctors<T, A>(
  Fname: string,
  ...ctrs: FunctorCtor<T, A>[]
): void {
  for (let FunctorCtor of ctrs) {
    // same as it(...)
    jsc.property(FunctorCtor.name + "'s Identity", anyArb, any => {
      const Fa =
        typeof FunctorCtor === "function" ? FunctorCtor(any) : FunctorCtor
      return R.equals(Fa.map(id), Fa)
    })

    jsc.property(
      FunctorCtor.name + "'s Composition",
      jsc.bool,
      "bool -> string",
      "string -> number",
      (bool: A, g: (a: A) => string, f: (a: string) => number) => {
        const Fa =
          typeof FunctorCtor === "function" ? FunctorCtor(bool) : FunctorCtor
        return R.equals(Fa.map(g).map(f), Fa.map(x => f(g(x))))
      }
    )
  }
}
