define(function() {
    "use strict";
    
    var supportsSIMD = typeof SIMD !== 'undefined' && SIMD.float32x4;
        
    // warning: supports only square matrices for performance reasons
    
    var Matrix = {
        build: function(size, fill) {
            var matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    matrix.push(fill);
                }
            }

            return matrix;
        },
                
        add: function(matrixA, matrixB) {
            var matrix = matrixA.slice(0),
                length = matrix.length;
            
            var i = 0;
            
            if (supportsSIMD) {
                var result32x4;
                
                for (; (i + 3) < length; i += 4) {
                    result32x4 = SIMD.float32x4.add(
                        SIMD.float32x4(matrixA[i], matrixA[i + 1], matrixA[i + 2], matrixA[i + 3]),
                        SIMD.float32x4(matrixB[i], matrixB[i + 1], matrixB[i + 2], matrixB[i + 3])
                    );
            
                    matrix[i    ] = result32x4[0];
                    matrix[i + 1] = result32x4[1];
                    matrix[i + 2] = result32x4[2];
                    matrix[i + 3] = result32x4[3];
                }
            }
            
            for (; i < length; ++i) {
                matrix[i] += matrixB[i];
            }
            
            return matrix;
        },

        subtract: function(matrixA, matrixB) {
            var matrix = matrixA.slice(0),
                length = matrix.length;
            
            var i = 0;
            
            if (supportsSIMD) {
                var result32x4;
                
                for (; (i + 3) < length; i += 4) {
                    result32x4 = SIMD.float32x4.sub(
                        SIMD.float32x4(matrixA[i], matrixA[i + 1], matrixA[i + 2], matrixA[i + 3]),
                        SIMD.float32x4(matrixB[i], matrixB[i + 1], matrixB[i + 2], matrixB[i + 3])
                    );
            
                    matrix[i    ] = result32x4[0];
                    matrix[i + 1] = result32x4[1];
                    matrix[i + 2] = result32x4[2];
                    matrix[i + 3] = result32x4[3];
                }
            }
            
            for (; i < length; ++i) {
                matrix[i] -= matrixB[i];
            }            

            return matrix;
        },

        multiply: function(matrixA, matrixB) {
            var matrix = [],
                length = matrixA.length,
                size   = Math.sqrt(length) | 0;

            switch (size) {
                case 1:
                    matrix[0] *= matrixB[0];
                    break;
                    
                case 2:
                    if (supportsSIMD) {
                        var result32x4A, result32x4B, result32x4C;
                        
                        result32x4A = SIMD.float32x4.mul(
                            SIMD.float32x4(matrixA[0], matrixA[0], matrixA[2], matrixA[2]),
                            SIMD.float32x4(matrixB[0], matrixB[1], matrixB[0], matrixB[1])
                        );
                
                        result32x4B = SIMD.float32x4.mul(
                            SIMD.float32x4(matrixA[1], matrixA[1], matrixA[3], matrixA[3]),
                            SIMD.float32x4(matrixB[2], matrixB[3], matrixB[2], matrixB[3])
                        );
                                                
                        result32x4C = SIMD.float32x4.add(result32x4A, result32x4B);
                        
                        matrix[0] = result32x4C[0];
                        matrix[1] = result32x4C[1];
                        matrix[2] = result32x4C[2];
                        matrix[3] = result32x4C[3];
                    } else {
                        matrix[0] = (matrixA[0] * matrixB[0]) + (matrixA[1] * matrixB[2]);
                        matrix[1] = (matrixA[0] * matrixB[1]) + (matrixA[1] * matrixB[3]);
                        matrix[2] = (matrixA[2] * matrixB[0]) + (matrixA[3] * matrixB[2]);
                        matrix[3] = (matrixA[2] * matrixB[1]) + (matrixA[3] * matrixB[3]);
                    }
                    break;
                
                default:
                    var indexA, indexB;
                    
                    for (var i = 0; i < length; ++i) {
                        matrix[i] = 0.0;
                        
                        for (var j = 0; j < size; ++j) {
                            indexA = (Math.floor(i / size) * size) + j;
                            indexB = (j * size) + (i % size);
                            
                            matrix[i] += matrixA[indexA] * matrixB[indexB];
                        }
                    }
                    
                    break;
            }
            
            return matrix;
        },
        
        multiplyVector: function(matrixA, vectorB) {
            var matrix = matrixA.slice(0),
                size   = Math.sqrt(matrix.length) | 0;

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    matrix[y * size + x] *= vectorB[x];
                }
            }
            
            return matrix;
        },

        multiplyScalar: function(matrixA, scalarB) {
            var matrix = matrixA.slice(0),
                length = matrix.length;
            
            var i = 0;
            
            if (supportsSIMD) {
                var result32x4;
                
                for (; (i + 3) < length; i += 4) {
                    result32x4 = SIMD.float32x4.mul(
                        SIMD.float32x4(matrix[i], matrix[i + 1], matrix[i + 2], matrix[i + 3]),
                        SIMD.float32x4(scalarB,   scalarB,       scalarB,       scalarB)
                    );
            
                    matrix[i    ] = result32x4[0];
                    matrix[i + 1] = result32x4[1];
                    matrix[i + 2] = result32x4[2];
                    matrix[i + 3] = result32x4[3];
                }
            }
            
            for (; i < length; ++i) {
                matrix[i] *= scalarB;
            }

            return matrix;
        },

        multiplyBulk: function(matrices) {
            var result = this.multiply(matrices.shift(), matrices.shift());
            
            while (matrices.length) {
                result = this.multiply(result, matrices.shift());
            }
            
            return result;
        },
        
        transpose: function(matrixA) {
            var matrix = [],
                size   = Math.sqrt(matrixA.length) | 0;

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    matrix[(size - y) * size - x - 1] = matrixA[y * size + x];
                }
            }

            return matrix;
        },

        // O(n!) - Laplace method for > 4 dimension
        determinant: function(matrixA) {
            var determinant = 0,
                size        = Math.sqrt(matrixA.length) | 0,
                m           = matrixA;
        
            switch (size) {
                case 1:
                    determinant = m[0];
                    break;

                case 2:
                    determinant = 
                        + m[0] * m[3] 
                        - m[1] * m[2];
                    break;

                case 3:
                    determinant = 
                        + m[0] * m[4] * m[8]
                        + m[3] * m[7] * m[2]
                        + m[6] * m[1] * m[5]
                        - m[3] * m[1] * m[8]
                        - m[0] * m[7] * m[5]
                        - m[6] * m[4] * m[2];
                    break;
                case 4:
                    determinant =
                        + m[0] * m[5] * m[10] * m[15] // 30
                        - m[0] * m[5] * m[11] * m[14] // 30
                        + m[0] * m[6] * m[11] * m[13]
                        - m[0] * m[6] * m[ 9] * m[15] 
                        + m[0] * m[7] * m[ 9] * m[14]
                        - m[0] * m[7] * m[10] * m[13]
                
                        - m[1] * m[4] * m[10] * m[15] // 30
                        + m[1] * m[4] * m[11] * m[14] // 30
                        - m[1] * m[6] * m[11] * m[12] 
                        + m[1] * m[6] * m[ 8] * m[15]
                        - m[1] * m[7] * m[ 8] * m[14] 
                        + m[1] * m[7] * m[10] * m[12]
                        
                        + m[2] * m[4] * m[ 9] * m[15] // 30
                        - m[2] * m[4] * m[11] * m[13] // 30
                        + m[2] * m[5] * m[11] * m[12] 
                        - m[2] * m[5] * m[ 8] * m[15]
                        + m[2] * m[7] * m[ 8] * m[13]
                        - m[2] * m[7] * m[ 9] * m[12]
                
                        - m[3] * m[4] * m[ 9] * m[14] // 30
                        + m[3] * m[4] * m[10] * m[13] // 30
                        + m[3] * m[5] * m[ 8] * m[14]
                        - m[3] * m[5] * m[10] * m[12]
                        - m[3] * m[6] * m[ 8] * m[13]
                        + m[3] * m[6] * m[ 9] * m[12];
                    break;
                default:
                    for (var x = 0; x < size; ++x) {
                        if (0 === m[x]) {
                            continue;
                        }

                        for (var yM = 1, minor = []; yM < size; ++yM) {
                            for (var xM = 0; xM < size; ++xM) {
                                if (xM === x) {
                                    continue;
                                }

                                minor.push(m[yM * size + xM]);
                            }
                        }
                        
                        determinant += (x % 2 ? -1 : 1) * m[x] * this.determinant(minor);
                    }
            }
                

            return determinant;
        },
        
        buildIdentity: function(size) {
            var matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    matrix[y * size + x] = (x === y) ? 1.0 : 0.0;
                }
            }

            return matrix;
        },

        buildRotation: function(size, axisA, axisB, θ, origin) {
            ++size; // add w parameter

            var cos    = Math.cos(θ),
                sin    = Math.sin(θ),
                matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    if (x === y) {
                        if (x === axisA || x === axisB) {
                            matrix[y * size + x] = cos;
                        } else {
                            matrix[y * size + x] = 1.0;
                        }
                    } else if (x === axisA && y === axisB) {
                        matrix[y * size + x] = sin;
                    } else if (x === axisB && y === axisA) {
                        matrix[y * size + x] = -sin;
                    } else {
                        matrix[y * size + x] = 0.0;
                    }
                }
            }
            
            if (origin) {
                var originMatrixApply  = this.buildTranslation(origin.slice(0).map(function(x) { return -x; })),
                    originMatrixCancel = this.buildTranslation(origin);
            
                matrix = this.multiplyBulk([
                    originMatrixApply,
                    matrix,
                    originMatrixCancel
                ]);
            }

            return matrix;
        },

        buildRotationByCosinus: function(size, axisA, axisB, cos) {
            ++size; // add w parameter

            var sin    = Math.sqrt(1 - cos * cos),
                matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    if (x === y) {
                        if (x === axisA || x === axisB) {
                            matrix[y * size + x] = cos;
                        } else {
                            matrix[y * size + x] = 1.0;
                        }
                    } else if (x === axisA && y === axisB) {
                        matrix[y * size + x] = sin;
                    } else if (x === axisB && y === axisA) {
                        matrix[y * size + x] = -sin;
                    } else {
                        matrix[y * size + x] = 0.0;
                    }
                }
            }

            return matrix;

        },

        buildTranslation: function(distances) {
            var size   = distances.length + 1, // add w parameter
                matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    if (x === y) {
                        matrix[y * size + x] = 1.0;
                    } else if (size - 1 === x) {
                        matrix[y * size + x] = distances[y];
                    } else {
                        matrix[y * size + x] = 0.0;
                    }
                }
            }

            return matrix;
        },

        buildScale: function(scales) {
            var size   = scales.length + 1, // add w parameter
                matrix = [];

            for (var y = 0; y < size; ++y) {
                for (var x = 0; x < size; ++x) {
                    if (x === y) {
                        if (y !== size - 1) {
                            matrix[y * size + x] = scales[y];
                        } else {
                            matrix[y * size + x] = 1.0;
                        }
                    } else {
                        matrix[y * size + x] = 0.0;
                    }
                }
            }

            return matrix;
        },
        
        buildPerspective: function(distanceVector) {
            var size   = distanceVector.length + 1,
                w      = size - 2,
                ratio  = 1 / distanceVector[w],
                matrix = this.buildIdentity(size);
            
            matrix[matrix.length - 1] = 0;
            matrix[matrix.length - 2] = ratio;
            
            for (var y = 0; y < w; ++y) {
                matrix[y * size + w] = -distanceVector[y] * ratio;
            }
                                    
            return matrix;
        },
        
        buildMinor: function(matrixA, row, column) {
            var matrix = [],
                size   = Math.sqrt(matrixA.length) | 0;
                        
            for (var y = 0, yM = 0; y < size; ++y) {
                if (y !== row) {
                    for (var x = 0, xM = 0; x < size; ++x) {
                        if (x !== column) {
                            matrix[yM * (size - 1) + xM] = matrixA[y * size + x];
                            ++xM;
                        }
                    }
                    ++yM;
                }
            }
            
            return matrix;
        },

        compose: function(size, scale, translation, rotation) {
            var matrix = this.buildIdentity(size + 1);

            if (scale) {
                matrix = this.multiply(matrix, scale);
            }

            if (translation) {
                matrix = this.multiply(matrix, translation);
            }

            if (rotation) {
                matrix = this.multiply(matrix, rotation);
            }

            return matrix;
        },
        
        resolve: function(matrixA) {
            var factors = [],
                size    = Math.sqrt(matrixA.length) | 0;
            
            for (var x = 0; x < size; ++x) {
                factors.push(
                    (0 === x % 2 ? -1 : 1) * 
                    Matrix.determinant(this.buildMinor(matrixA, 0, x))
                );
            }
            
            return factors;
        }
    };
    
    return Matrix;
});