define([
    '../../Math/Vector'
], function(Vector) {
    "use strict";
    
    var IncraseComplexityAlgorithm = function(geometry, factor, progressNotifier) {
        if (!factor) {
            factor = 1;
        }
        
        var trianglesLength, newTriangles,
            vertexA,  vertexB,  vertexC,
            vertexAB, vertexBC, vertexCA,
            vectorA,  vectorB,  vectorC,
            vectorAB, vectorBC, vectorCA;
        
        for (var i = 0; i < factor; ++i) {
            trianglesLength = geometry.triangles.length;
            newTriangles    = [];

            for (var trianglePointer = 0; trianglePointer < trianglesLength; trianglePointer += 3) {
                vertexA  = geometry.triangles[trianglePointer];
                vertexB  = geometry.triangles[trianglePointer + 1];
                vertexC  = geometry.triangles[trianglePointer + 2];
                
                vectorA  = geometry.vectors[vertexA];
                vectorB  = geometry.vectors[vertexB];
                vectorC  = geometry.vectors[vertexC];
                
                vectorAB = Vector.divideScalar(Vector.add(vectorA, vectorB), 2);
                vectorBC = Vector.divideScalar(Vector.add(vectorB, vectorC), 2);
                vectorCA = Vector.divideScalar(Vector.add(vectorC, vectorA), 2);

                vertexAB = geometry.addVertex(vectorAB);
                vertexBC = geometry.addVertex(vectorBC);
                vertexCA = geometry.addVertex(vectorCA);

                geometry.removeEdge(vertexA, vertexB);
                geometry.removeEdge(vertexB, vertexC);
                geometry.removeEdge(vertexC, vertexA);

                geometry.addEdge(vertexA,  vertexAB);
                geometry.addEdge(vertexAB, vertexB);

                geometry.addEdge(vertexB,  vertexBC);
                geometry.addEdge(vertexBC, vertexC);

                geometry.addEdge(vertexC,  vertexCA);
                geometry.addEdge(vertexCA, vertexA);

                geometry.addEdge(vertexAB, vertexBC);
                geometry.addEdge(vertexBC, vertexCA);
                geometry.addEdge(vertexCA, vertexAB);

                newTriangles.push(vertexA,  vertexAB, vertexCA);
                newTriangles.push(vertexB,  vertexBC, vertexAB);
                newTriangles.push(vertexC,  vertexCA, vertexBC);
                newTriangles.push(vertexAB, vertexBC, vertexCA);
                
                progressNotifier(geometry);
            }

            geometry.triangles = newTriangles.slice(0);
            
            progressNotifier(geometry);
        }
    };
    
    return IncraseComplexityAlgorithm;
});