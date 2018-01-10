"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = require("../../src/math/Matrix");
var Vector_1 = require("../../src/math/Vector");
describe('Vector', function () {
    function roundVector(vector) {
        for (var x = 0; x < vector.length; ++x) {
            vector[x] = Math.round(vector[x] * 10000) / 10000;
        }
        return vector;
    }
    it('should build vector', function () {
        expect(Vector_1.Vector.build(3, 1)).toEqual([1, 1, 1]);
    });
    it('should add two vectors', function () {
        expect(Vector_1.Vector.add([1, 2, 3], [4, 5, 6])).toEqual([5, 7, 9]);
    });
    it('should subtract two vectors', function () {
        expect(Vector_1.Vector.subtract([1, 2, 3], [4, 5, 6])).toEqual([-3, -3, -3]);
    });
    it('should multiply vector by scalar', function () {
        expect(Vector_1.Vector.multiplyScalar([1, 2, 3], 3)).toEqual([3, 6, 9]);
    });
    it('should normalize vector', function () {
        expect(roundVector(Vector_1.Vector.normalize([3, 1, 2]))).toEqual([.8018, .2673, .5345]);
    });
    it('should invert vector', function () {
        expect(roundVector(Vector_1.Vector.invert([1, 2, 3]))).toEqual([-1, -2, -3]);
    });
    it('should rotate vector OX', function () {
        expect(roundVector(Vector_1.Vector.transform([1, 2, 3], Matrix_1.Matrix.buildRotation(3, 1, 2, Math.PI / 2)))).toEqual([1, -3, 2]);
    });
    it('should rotate vector OY', function () {
        expect(roundVector(Vector_1.Vector.transform([1, 2, 3], Matrix_1.Matrix.buildRotation(3, 0, 2, Math.PI / 2)))).toEqual([-3, 2, 1]);
    });
    it('should rotate vector OZ', function () {
        expect(roundVector(Vector_1.Vector.transform([1, 2, 3], Matrix_1.Matrix.buildRotation(3, 0, 1, Math.PI / 2)))).toEqual([-2, 1, 3]);
    });
    it('should scale vector', function () {
        expect(Vector_1.Vector.transform([1, 2, 3], Matrix_1.Matrix.buildScale([2, 3, -4]))).toEqual([2, 6, -12]);
    });
    it('should translate vector', function () {
        expect(Vector_1.Vector.transform([1, 2, 3], Matrix_1.Matrix.buildTranslation([3, -2, 6]))).toEqual([4, 0, 9]);
    });
});
