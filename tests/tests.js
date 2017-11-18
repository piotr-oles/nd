QUnit.config.autostart = false;

require([
    'nd/Math/Matrix',
    'nd/Math/Vector'
], function(Matrix, Vector) {
    /* --------------------------------------- */
    /* ------------- TEST MATRIX ------------- */
    module('Matrix');

    var matrixA = 
        [ 
            0, 1, 2, 
            3, 4, 5,
            6, 7, 8
        ];

    var matrixB =
        [
            8, 7, 6,
            5, 4, 3,
            2, 1, 0
        ];


    function matrixRound(matrix) 
    {
        var size = Math.sqrt(matrix.length) | 0; 
        
        for (var y = 0; y < size; ++y) {
            for (var x = 0; x < size; ++x) {
                matrix[y * size + x] = Math.round(matrix[y * size + x] * 10000) / 10000;
            }
        }

        return matrix;
    }

    test('add', function() {
        deepEqual(
            Matrix.add(matrixA, matrixB), 
            [
                8, 8, 8,
                8, 8, 8,
                8, 8, 8
            ], 
            "Add two matrices"
        );
    });

    test('subtract', function() {
        deepEqual(
            Matrix.subtract(matrixA, matrixB), 
            [
                -8, -6, -4,
                -2,  0,  2,
                 4,  6,  8
            ], 
            "Subtract two matrices"
        );
    });

    test('multiply', function() {
        deepEqual(
            Matrix.multiply(matrixA, matrixB), 
            [
                 9,  6,  3,
                54, 42, 30,
                99, 78, 57
            ], 
            "Multiply two matrices"
        );
    });

    test('multiplyScalar', function() {
        deepEqual(
            Matrix.multiplyScalar(matrixA, 2), 
            [
                 0,  2,  4,
                 6,  8, 10,
                12, 14, 16
            ], 
            "Multiply matrix by scalar"
        );
    });

    test('transpose', function() {
        deepEqual(
            Matrix.transpose(matrixA), matrixB, 
            "Transpose matrix"
        );
    });


    test('buildIdentity', function() {
        deepEqual(
            Matrix.buildIdentity(3),
            [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ]
            ,
            "Build matrix"
        );
    });

    test('buildRotation', function() {    
        deepEqual(
            matrixRound(Matrix.buildRotation(3, 0, 1, Math.PI / 2)),
            [
                0, -1, 0, 0,
                1,  0, 0, 0,
                0,  0, 1, 0,
                0,  0, 0, 1
            ]
            ,
            "Build 3x3 matrix rotation"
        );
    });
    
    test('buildTranslation', function() {    
        deepEqual(
            Matrix.buildTranslation([1, 2, 3]),
            [
                1, 0, 0, 1,
                0, 1, 0, 2,
                0, 0, 1, 3,
                0, 0, 0, 1
            ]
            ,
            "Build matrix translation"
        );
    });

    test('buildScale', function() {    
        deepEqual(
            Matrix.buildScale([2, 3, 4]),
            [
                2, 0, 0, 0,
                0, 3, 0, 0,
                0, 0, 4, 0,
                0, 0, 0, 1
            ]
            ,
            "Build matrix scale"
        );
    });
    
    test('buildMinor', function() {
        deepEqual(
            Matrix.buildMinor(matrixA, 0, 0), 
            [ 
                4, 5,
                7, 8
            ], 
            "Build minor from 3x3 matrix"
        );
    });
    
    test('determinant', function() {
        equal(
            Matrix.determinant(
            [
                3
            ]),
            3,
            "Determinant of one-dimension matrix"
        );

        equal(
            Matrix.determinant(
            [
                3, 2, 
                5, 4
            ]),
            2,
            "Determinant of two-dimension matrix"
        );

        equal(
            Matrix.determinant(
            [
                6, 5, 4, 
                2, 3, 7, 
                5, 9, 8
            ]),
            -127,
            "Determinant of three-dimension matrix"
        );

        equal(
            Matrix.determinant(
            [
                6, 5, 4, 6,
                2, 3, 7, 4,
                5, 9, 8, 3,
                3, 2, 5, 4
            ]),
            157,
            "Determinant of four-dimension matrix"
        );

        equal(
            Matrix.determinant(
            [
                6, 5, 4, 6, 4,
                2, 3, 7, 4, 3,
                5, 9, 8, 3, 1,
                3, 2, 5, 4, 5,
                3, 2, 6, 4, 1
            ]),
            -779,
            "Determinant of five-dimension matrix"
        );
    });
    
    /* --------------------------------------- */
    /* ------------- TEST VECTOR ------------- */

    module('Vector');

    function vectorRound(vector)
    {
        for (var x = 0; x < vector.length; ++x) {
            vector[x] = Math.round(vector[x] * 10000) / 10000;
        }

        return vector;
    }

    test('build', function() {    
        deepEqual(
            Vector.build(3, 1),
            [1, 1, 1],
            "Build vector"
        );
    });

    test('add', function() {    
        deepEqual(
            Vector.add([1, 2, 3], [4, 5, 6]),
            [5, 7, 9],
            "Add vectors"
        );
    });

    test('subtract', function() {    
        deepEqual(
            Vector.subtract([1, 2, 3], [4, 5, 6]),
            [-3, -3, -3],
            "Subtract vectors"
        );
    });

    test('multiply', function() {    
        deepEqual(
            Vector.multiplyScalar([1, 2, 3], 3),
            [3, 6, 9],
            "Multiply vector"
        );
    });

    test('normalize', function() {    
        deepEqual(
            vectorRound(
                Vector.normalize([3, 1, 2])
            ),
            [.8018, .2673, .5345],
            "Normalize vector"
        );
    });

    test('invert', function() {    
        deepEqual(
            Vector.invert([1, 2, 3]),
            [-1, -2, -3],
            "Invert vector"
        );
    });

    test('transform', function() {    

        deepEqual(
            vectorRound(Vector.transform(
                [1, 2, 3], 
                Matrix.buildRotation(3, 1, 2, Math.PI / 2)
            )),
            [1, -3, 2],
            "Rotate vector OX"
        );

        deepEqual(
            vectorRound(Vector.transform(
                [1, 2, 3], 
                Matrix.buildRotation(3, 0, 2, Math.PI / 2)
            )),
            [-3, 2, 1],
            "Rotate vector OY"
        );

        deepEqual(
            vectorRound(Vector.transform(
                [1, 2, 3], 
                Matrix.buildRotation(3, 0, 1, Math.PI / 2)
            )),
            [-2, 1, 3],
            "Rotate vector OZ"
        );

        deepEqual(
            Vector.transform(
                [1, 2, 3],
                Matrix.buildScale([2, 3, -4])        
            ),
            [2, 6, -12],
            "Scale vector"
        );

        deepEqual(
            Vector.transform(
                [1, 2, 3],
                Matrix.buildTranslation([3, -2, 6])        
            ),
            [4, 0, 9],
            "Translate vector"
        );
    });
    
    QUnit.start();
});

