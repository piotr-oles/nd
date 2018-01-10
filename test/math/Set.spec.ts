import { Set } from '../../src/math/Set';

describe('Set', () => {

  it('should generate permutation', () => {
    const set = [1, 2, 3];
    const expected = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]];
    const permutations = Array.from(Set.permutation(set));

    expect(permutations).toEqual(expected);
  });

  it('should generate variation', () => {
    const set = [1, 2, 3];
    const expected = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
    const combinations = Array.from(Set.variation(set, 2));

    expect(combinations).toEqual(expected);
  });

  it('should generate combination', () => {
    const set = [1, 2, 3];
    const expected = [[1, 2], [1, 3], [2, 3]];
    const combinations = Array.from(Set.combination(set, 2));

    expect(combinations).toEqual(expected);
  });

});
