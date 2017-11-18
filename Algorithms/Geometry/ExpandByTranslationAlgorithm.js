define(function() {
    "use strict";
    
    var ExpandByTranslationAlgorithm = function(geometry, A, B, progressNotifier) {
        var translationMap = {},
            sourceVector, sourceSiblings, sourceVertexId,
            targetVector,                 targetVertexId;
        
        geometry.eachVertex(function(sourceVertexId) {
            sourceVector   = geometry.vectors [sourceVertexId];
            sourceSiblings = geometry.siblings[sourceVertexId];
            
            targetVector   = sourceVector.slice(0);
            targetVertexId = geometry.addVertex(targetVector, []);
            
            sourceVector.push(A);
            targetVector.push(B);
            
            translationMap[sourceVertexId] = targetVertexId;
            
            if (progressNotifier) {
                progressNotifier(geometry);
            }     
        });
        
        for (sourceVertexId in translationMap) {
            targetVertexId = translationMap[sourceVertexId];
            sourceSiblings = geometry.siblings[sourceVertexId];
            
            geometry.siblings[targetVertexId] = sourceSiblings.slice(0).map(function(sourceSiblingVertexId) {
                return translationMap[sourceSiblingVertexId];
            });
            
            geometry.addEdge(sourceVertexId | 0, targetVertexId);
            
            if (progressNotifier) {
                progressNotifier(geometry);
            }
        }
        
        ++geometry.dimension;
        geometry.origin.push((A + B) / 2);
        geometry.refreshKeys();
    };
        
    return ExpandByTranslationAlgorithm;
});