define(function() {
    "use strict";
    
    // permutation module
    (function(Math) {
        var buildPermutations = function(set, pointer, permutations) {
            var setLength = set.length;
            
            if (pointer === setLength) {
                permutations.push(set);
            } else {
                var permutation;
                
                for (var i = pointer; i < setLength; ++i) {
                    permutation = set.slice(0);

                    permutation[pointer] = set[i];
                    permutation[i]       = set[pointer];

                    buildPermutations(permutation, pointer + 1, permutations);
                }
            }
        };
                
        var buildVariations = function(set, k, withRepeat, result, variations) {
            if (k === result.length) {
                variations.push(result);
            } else {
                var setLength = set.length,
                    variation, subset;

                for (var i = 0; i < setLength; ++i) {
                    variation = result.slice(0);
                    variation.push(set[i]);
                    
                    subset = set.slice(0);
                    
                    if (!withRepeat) {
                        subset.splice(i, 1);
                    }
                    
                    buildVariations(subset, k, withRepeat, variation, variations);
                }
            }
        };
        
        var buildCombinations = function(set, k, withRepeat, result, combinations) {
            if (k === result.length) {
                combinations.push(result);
            } else {
                var setLength = set.length,
                    subset    = set.slice(0),
                    combination;
                
                for (var i = 0; i < setLength; ++i) {
                    subset      = subset.slice(0);
                    combination = result.slice(0);
                    combination.push(set[i]);
                    
                    subset.shift();
                    
                    if (combination.length + subset.length >= k) {
                        buildCombinations(subset, k, withRepeat, combination, combinations);
                    }
                }
            }
        };
        
        Math.permutations = function(set) {
            var permutations = [];
            buildPermutations(set, 0, permutations);
            
            return permutations;
        };
        
        Math.variations = function(set, k, withRepeat) {
            var variations = [];
            buildVariations(set, k, !!withRepeat, [], variations);
            
            return variations;
        };
        
        Math.combinations = function(set, k, withRepeat) {
            var combinations = [];
            
            if (k === set.length) {
                combinations.push(set);
            } else if (k < set.length) {
                buildCombinations(set, k, !!withRepeat, [], combinations);
            }
            
            return combinations;
        };
    })(Math);
    
    // radians/degrees conversion module
    (function(Math) {
        Math.RAD_TO_DEG = 180 / Math.PI;
        Math.DEG_TO_RAD = Math.PI / 180;
        
        function degreesAsm(stdlib, foreign, heap) {
            "use asm";
            
            var RAD_TO_DEG = +foreign.RAD_TO_DEG;
            
            function degrees(radians) {
                radians = +radians;
                
                return +(radians * RAD_TO_DEG);
            }
            
            return degrees;
        }
        
        function radiansAsm(stdlib, foreign, heap) {
            "use asm";
            
            var DEG_TO_RAD = +foreign.DEG_TO_RAD;
            
            function degrees(degrees) {
                degrees = +degrees;
                
                return +(degrees * DEG_TO_RAD);
            }
            
            return degrees;
        }

        Math.degrees = degreesAsm({Math: Math}, {RAD_TO_DEG: Math.RAD_TO_DEG});
        Math.radians = radiansAsm({Math: Math}, {DEG_TO_RAD: Math.DEG_TO_RAD});
    })(Math);

    // nearly equal module
    (function(Math) {
        function nearlyEqualAsm(stdlib) {
            "use asm";

            var abs = stdlib.Math.abs;

            function nearlyEqual(a, b) {
                a = +a;
                b = +b;

                var d       = 0.0, 
                    dM      = 0.0, 
                    epsilon = 0.000000119209290; 

                d = +abs(a - b);
                
                if (+abs(a) < +abs(b)) {
                    dM = +abs(a);
                } else {
                    dM = +abs(b);
                }
                
                if (+a == +b) {
                    return 1|0;
                } else if (+d < +epsilon) {
                    return 1|0;
                } else if (+d < (+dM * +epsilon)) {
                    return 1|0;
                }
                
                return 0|0;
            }

            return nearlyEqual;
        }

        Math.nearlyEqual = nearlyEqualAsm({Math: Math});
    })(Math);
    
    // consts module
    (function(Math) {
        Math.PI2 = Math.PI * 2.0;
        Math.PHI = (1 + Math.sqrt(5)) / 2;
    })(Math);
    
    return Math;
});
