"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Set_1 = require("../../src/math/Set");
describe('Set', function () {
    // it('should generate permutation', () => {
    //   const set = [1, 2, 3];
    //   const expected = [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2]];
    //   let permutations = [];
    //   for (let permutation of Set.permutation(set)) {
    //     console.log(permutation);
    //     permutations.push(permutation);
    //   }
    //
    //   expect(permutations).toEqual(expected);
    //
    // });
    it('should generate combination', function () {
        var set = [1, 2, 3];
        var expected = [[1, 2], [1, 3], [2, 3]];
        var combinations = [];
        for (var _i = 0, _a = Set_1.Set.combination(set, 2); _i < _a.length; _i++) {
            var combination = _a[_i];
            combinations.push(combination);
        }
        expect(combinations).toEqual(expected);
    });
});
