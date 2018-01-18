
export type Set = number[];

export namespace Set {
  export function *permutation(set: Set, pointer: number = 0) {
    if (pointer === set.length) {
      yield set;
      return;
    } else {
      let nextSet;

      for (let i = pointer; i < set.length; ++i) {
        nextSet = set.slice(0);

        nextSet[pointer] = set[i];
        nextSet[i]       = set[pointer];

        yield *permutation(nextSet, pointer + 1);
      }
    }
  }

  export function *variation(set: Set, k: number, result: Set = []) {
    if (k === result.length) {
      yield result;
    } else {
      let nextSet: Set;
      let subSet: Set;

      for (let i = 0; i < set.length; ++i) {
        nextSet = result.slice(0);
        nextSet.push(set[i]);

        subSet = set.slice(0);


        yield *variation(subSet, k, nextSet);
      }
    }
  }

  export function *combination(set: Set, k: number, result: Set = []) {
    if (k === result.length) {
      yield result;
    } else {
      let subSet = set.slice(0);
      let nextSet;

      for (let i = 0; i < set.length; ++i) {
        subSet = subSet.slice(0);
        nextSet = result.slice(0);
        nextSet.push(set[i]);

        subSet.shift();

        if (nextSet.length + subSet.length >= k) {
          yield *combination(subSet, k, nextSet);
        }
      }
    }
  }
}
