
export type Set = number[];

export namespace Set {
  export function *permutation(set: Set, pointer: number = 0): Iterable<Set> {
    const length = set.length;

    if (pointer === length) {
      yield set;
    } else {
      let nextSet;

      for (let i = pointer; i < length; ++i) {
        nextSet = set.slice(0);

        nextSet[pointer] = set[i];
        nextSet[i]       = set[pointer];

        yield *permutation(nextSet, pointer + 1);
      }
    }
  }

  export function *variation(set: Set, k: number, withRepeat: boolean = false, result?: Set = []): Iterable<Set> {
    if (k === result.length) {
      yield result;
    } else {
      const length = set.length;
      let nextSet: Set;
      let subSet: Set;

      for (let i = 0; i < length; ++i) {
        nextSet = result.slice(0);
        nextSet.push(set[i]);

        subSet = set.slice(0);

        if (!withRepeat) {
          subSet.splice(i, 1);
        }

        yield *variation(subSet, k, withRepeat, nextSet);
      }
    }
  }

  export function *combination(set: Set, k: number, withRepeat: boolean = false, result?: Set = []): Iterable<Set> {
    if (k === result.length) {
      yield result;
    } else {
      const length = set.length;
      let subSet = set.slice(0);
      let nextSet;

      for (let i = 0; i < length; ++i) {
        subSet = subSet.slice(0);
        nextSet = result.slice(0);
        nextSet.push(set[i]);

        subSet.shift();

        if (nextSet.length + subSet.length >= k) {
          yield *combination(subSet, k, withRepeat, nextSet);
        }
      }
    }
  }
}