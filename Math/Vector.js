define([
    './Extend'
], function(Math) {
    "use strict";
    
    var Vector = {        
        build: function(size, fill) {
            var vector = [];

            for (var i = 0; i < size; ++i) {
                vector[i] = fill;
            }
            
            return vector;
        },
        
        add: function(vectorA, vectorB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] += vectorB[i];
            }

            return vector;
        },
        
        addScalar: function(vectorA, scalarB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] += scalarB;
            }

            return vector;
        },
        
        subtract: function(vectorA, vectorB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] -= vectorB[i];
            }

            return vector;
        },
        
        subtractScalar: function(vectorA, scalarB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] -= scalarB;
            }

            return vector;
        },
        
        multiply: function(vectorA, vectorB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] *= vectorB[i];
            }

            return vector;
        },
        
        multiplyScalar: function(vectorA, scalarB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] *= scalarB;
            }

            return vector;
        },
        
        divide: function(vectorA, vectorB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                if (0 === vectorB[i]) {
                    vector[i] *= Infinity;
                } else {
                    vector[i] /= vectorB[i];
                }                
            }

            return vector;
        },
        
        divideScalar: function(vectorA, scalarB) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                if (0 === scalarB) {
                    vector[i] *= Infinity;
                } else {
                    vector[i] /= scalarB;
                }
            }

            return vector;
        },
        
        multiplyMatrix: function(vectorA, matrixB) {
            var vector = this.build(vectorA.length, 0.0),
                size   = vector.length;
            
            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    vector[y] += matrixB[y * size + x] * vector[x];
                }
            }
            
            return vector;
        },
        
        normalize: function(vectorA) {
            var vector    = vectorA.slice(0),
                size      = vector.length,
                distance2 = 0.0,
                distance;

            for (var i = 0; i < size; ++i) {
                distance2 += vector[i] * vector[i];
            }

            distance = 1 / Math.sqrt(distance2);

            for (var j = 0; j < size; ++j) {
                vector[j] *= distance;
            }

            return vector;
        },
        
        resize: function(vectorA, size) {
            var length = Vector.distance(vectorA);
            
            if (0 !== length) {
                return Vector.multiplyScalar(vectorA, size / length);
            } else {
                try {
                    console.log('Zero vector');
                } catch (e) {}
                return Vector.build(vectorA.length, 0);
            }            
        },
        
        invert: function(vectorA) {
            var vector = vectorA.slice(0),
                size   = vector.length;

            for (var i = 0; i < size; ++i) {
                vector[i] *= -1;
            }

            return vector;
        },
        
        flatten: function(vectorA) {
            var vector = this.build(vectorA.length - 1),
                size   = vector.length;
            
            for (var i = 0; i < size; ++i) {
                vector[i] = vectorA[i];
            }
            
            return vector;
        },
        
        transform: function(vectorA, matrixB) {
            var vector = this.build(vectorA.length, 0.0),
                size   = vector.length;
                    
            for (var y = 0; y < size; ++y) {
                // rotations and scales
                for (var x = 0; x < size; ++x) {
                    vector[y] += matrixB[y * (size + 1) + x] * vectorA[x];
                }

                // translations
                vector[y] += matrixB[(size + 1) * y + size];
            }
                        
            return vector;
        },
        
        distance: function(vectorA, vectorB) {
            var squereSum = 0.0,
                size      = vectorA.length;

            if (!vectorB) {
                for (var i = 0; i < size; ++i) {
                    squereSum += vectorA[i] * vectorA[i];
                }        
            } else {
                for (var i = 0; i < size; ++i) {
                    squereSum += (vectorA[i] - vectorB[i]) * (vectorA[i] - vectorB[i]);
                }
            }

            return Math.sqrt(squereSum);
        },
        
        dot: function(vectorA, vectorB) {
            var product = 0.0,
                size    = vectorA.length;
            
            for (var i = 0; i < size; ++i) {
                product += vectorA[i] * vectorB[i];
            }
            
            return product;
        },
        
        cosinus: function(vectorA, vectorB) {
            var distance = this.distance(vectorA, vectorB),
                dot      = this.dot     (vectorA, vectorB);
            
            return distance === 0.0 ? NaN : dot / distance;
        },
        
        sinus: function(vectorA, vectorB) {
            var cosinus = this.cosinus(vectorA, vectorB);
            
            if (NaN !== cosinus) {
                return Math.sqrt(1 - cosinus * cosinus);
            } else {
                return NaN;
            }
        },

        cross: function(vectorA, vectorB) {
            var product = this.build(3, 0.0);

            product[0] = vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1];
            product[1] = vectorA[0] * vectorB[2] - vectorA[2] * vectorB[0];
            product[2] = vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];

            return product;
        },
                
        equal: function(vectorA, vectorB) {
            var size    = vectorA.length,
                isEqual = true;
            
            for (var i = 0; i < size; ++i) {
                if (vectorA[i] !== vectorB[i]) {
                    isEqual = false;
                    break;
                }
            }
            
            return isEqual;
        },
        
        equalScalar: function(vectorA, scalarB) {
            var size    = vectorA.length,
                isEqual = true;
            
            for (var i = 0; i < size; ++i) {
                if (vectorA[i] !== scalarB) {
                    isEqual = false;
                    break;
                }
            }
            
            return isEqual;
        },
        
        nearlyEqual: function(vectorA, vectorB) {
            var size          = vectorA.length,
                isNearlyEqual = true;
            
            for (var i = 0; i < size; ++i) {
                if (!Math.nearlyEqual(vectorA[i], vectorB[i])) {
                    isNearlyEqual = false;
                    break;
                }
            }
            
            return isNearlyEqual;
        },
        
        nearlyEqualScalar: function(vectorA, scalarB) {
            var size          = vectorA.length,
                isNearlyEqual = true;
            
            for (var i = 0; i < size; ++i) {
                if (!Math.nearlyEqual(vectorA[i], scalarB)) {
                    isNearlyEqual = false;
                    break;
                }
            }
            
            return isNearlyEqual;
        },
        
        arithmeticAverage: function(vectorA) {
            var size = vectorA.length,
                sum  = 0;
            
            for (var i = 0; i < size; ++i) {
                sum += vectorA[i];
            }
            
            return size !== 0 ? sum / size : NaN;
        },
                
        toString: function(vectorA) {
            return '[' + vectorA.join(',') + ']';        
        }
    };
    
    return Vector;
});
