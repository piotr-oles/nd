"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = require("../../src/math/Matrix");
describe('Matrix', function () {
    var matrixA;
    var matrixB;
    beforeEach(function () {
        matrixA =
            [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ];
        matrixB =
            [
                8, 7, 6,
                5, 4, 3,
                2, 1, 0
            ];
    });
    function roundMatrix(matrix) {
        var size = Math.sqrt(matrix.length) | 0;
        for (var y = 0; y < size; ++y) {
            for (var x = 0; x < size; ++x) {
                matrix[y * size + x] = Math.round(matrix[y * size + x] * 10000) / 10000;
            }
        }
        return matrix;
    }
    it('should add two matrices', function () {
        expect(Matrix_1.Matrix.add(matrixA, matrixB)).toEqual([
            8, 8, 8,
            8, 8, 8,
            8, 8, 8
        ]);
    });
    it('should subtract two matrices', function () {
        expect(Matrix_1.Matrix.subtract(matrixA, matrixB)).toEqual([
            -8, -6, -4,
            -2, 0, 2,
            4, 6, 8
        ]);
    });
    it('should multiply two matrices', function () {
        expect(Matrix_1.Matrix.multiply(matrixA, matrixB)).toEqual([
            9, 6, 3,
            54, 42, 30,
            99, 78, 57
        ]);
    });
    it('should multiply matrix by scalar', function () {
        expect(Matrix_1.Matrix.multiplyScalar(matrixA, 2)).toEqual([
            0, 2, 4,
            6, 8, 10,
            12, 14, 16
        ]);
    });
    it('should transpose matrix', function () {
        expect(Matrix_1.Matrix.transpose(matrixA)).toEqual([
            8, 7, 6,
            5, 4, 3,
            2, 1, 0
        ]);
    });
    it('should build identity matrix', function () {
        expect(Matrix_1.Matrix.buildIdentity(3)).toEqual([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
    });
    it('should build rotation matrix', function () {
        expect(roundMatrix(Matrix_1.Matrix.buildRotation(3, 0, 1, Math.PI / 2))).toEqual([
            0, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    });
    it('should build translation matrix', function () {
        expect(Matrix_1.Matrix.buildTranslation([1, 2, 3])).toEqual([
            1, 0, 0, 1,
            0, 1, 0, 2,
            0, 0, 1, 3,
            0, 0, 0, 1
        ]);
    });
    it('should build scale matrix', function () {
        expect(Matrix_1.Matrix.buildScale([2, 3, 4])).toEqual([
            2, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 4, 0,
            0, 0, 0, 1
        ]);
    });
});
