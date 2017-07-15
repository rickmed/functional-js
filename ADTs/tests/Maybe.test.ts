import {testFunctors} from "./Functor"
import * as M from "../Maybe"

const Maybe = "Maybe"

function Nothing<A>(): M.Maybe<A> {
  return new M._Nothing()
}

describe(Maybe, () => {
  describe("Functor", () => {
    describe("Satisfies laws", () => {
      testFunctors(Maybe, M.Just, Nothing)
    })
  })
})
