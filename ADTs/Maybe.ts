import HKT from './HKT'
import {Functor} from './Functor'

export type URI = 'Maybe'

export type Maybe<A> = _Just<A> | _Nothing<A>

export class _Nothing<A> implements Functor<URI, A> {
  _hkt: URI
  _hkta: any
  _ctor = 'Nothing'
  _val: any = undefined
  constructor() {}
  map<B>(f: (a: A) => B): Maybe<A> {
    return this
  }
}

export class _Just<A> implements Functor<URI, A> {
  _hkt: URI
  _hkta: A
  _ctor = 'Just'
  constructor(readonly _val: A) {}
  map<B>(f: (a: A) => B): Maybe<B> {
    return new _Just(f(this._val))
  }
}


/* Static functions*/

export function Just<A>(a: A): Maybe<A>{
  return new _Just(a)
}

export const Nothing = new _Nothing()
