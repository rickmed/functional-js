/* Problem with generic TS HKT:
interface StaticFunctor<A> {
  map<A, B>(f: (a: A) => B, fa: StaticFunctor<A>): StaticFunctor<B>
}
// we can't do the above bc map must return a functor of the SAME type.
// here map is returning a generic type of functor
// IE: you could change from Maybe to Either.
*/

// Solution: encode the type of the type class in a phantom dic
export default interface HKT<T, A> {
  _hkt: T   // type containing A. EG: "Maybe"
  _hkta: A   // _val type inside hkt. EG: string
  _ctor: string   // EG: "Nothing", "Right", "Array"
  _val: A
}
