define([
    '../../Math/Vector'
], function(Vector) {
    "use strict";
    
    var ExpandByPermutationAlgorithm = function(geometry, A, B, progressNotifier) {
        var dimension = geometry.dimension,
            vectorA   = Vector.build(dimension, 0),
            vectorB   = Vector.build(dimension, 0);
            
        vectorA.push(A);
        vectorB.push(B);
        
        var vertexA = geometry.addVertex(vectorA),
            vertexB = geometry.addVertex(vectorB);
        
        geometry.eachVertex(function(vertexId) {
            if (vertexId === vertexA || vertexId === vertexB) {
                return;
            }
            
            geometry.vectors[vertexId].push(0);
            
            geometry.addEdge(vertexA, vertexId);
            geometry.addEdge(vertexB, vertexId);
                        
            if (progressNotifier) {
                progressNotifier(geometry);
            }
        });
        
        ++geometry.dimension;
        geometry.origin.push((A + B) / 2);
        geometry.refreshKeys();
    };
        
    return ExpandByPermutationAlgorithm;
});