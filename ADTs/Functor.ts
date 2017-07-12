import HKT from './HKT'

// B | A for performance when invariant (EG: Nothing.map())
export interface Functor<T, A> extends HKT<T, A> {
  map<B>(f: (a: A) => B): Functor<T, B | A>
}

// export function map<T, A, B>(f: (a: A) => B, Fa: Functor<T, A>): Functor<T, B | A> {
//   return Fa.map(f)
// }

