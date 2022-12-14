type Primitive = string | number | boolean | bigint | symbol;
const __EXISTING__ = new Map<
  Primitive,
  Map<Primitive, Tuple<Primitive, Primitive>>
>();
let constructing = false
class Tuple<A extends Primitive, B extends Primitive> {
  #a: A;
  #b: B;
  constructor(a: A, b: B) {
    this.#a = a;
    this.#b = b;
    if(!constructing) return Tuple.create(a,b) as this
  }

  static create(a: Primitive, b: Primitive) {
    const existing = __EXISTING__.get(a)?.get(b);
    if (!existing) {
      constructing = true
      const tuple = Object.freeze(new Tuple(a, b));
      constructing = false
      const nested = __EXISTING__.get(a) ?? new Map();
      nested.set(b, tuple);
      __EXISTING__.set(a, nested);
      return tuple
    }
    return existing
  }

  get [0]() {
    return this.#a;
  }

  get [1]() {
    return this.#b;
  }

   toArray() {
    return [this.#a, this.#b];
  }

   toString() {
    return `[${String(this.#a)},${String(this.#b)}]`;
  }

  *[Symbol.iterator](): IterableIterator<A | B> {
    yield this.#a
    yield this.#b
  }
}

export default new Proxy(Tuple, {
  apply(_target, _thisArg, args: ConstructorParameters<typeof Tuple>) {
    return Tuple.create(...args)
  },
  construct(_target, args: [Primitive,Primitive]) {
    return Tuple.create(...args)
  }
}) as typeof Tuple & {
  <A extends Primitive, B extends Primitive>(a:A,b:B): Readonly<Tuple<A,B>>
};

export type TupleOf<A extends Primitive,B extends Primitive> = Readonly<Tuple<A,B>>
