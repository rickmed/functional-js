import {testFunctors} from "./Functor"
import * as M from "../Maybe"

const Maybe = "Maybe"

describe(Maybe, () => {
  describe("Functor", () => {
    describe("Satisfies laws", () => {
      testFunctors(Maybe, M.Just, M.Nothing)
    })
  })
})
