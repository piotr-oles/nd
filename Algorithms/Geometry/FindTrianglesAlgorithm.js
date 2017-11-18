define([
    './WalkAlgorithm'
], function(WalkAlgorithm) {
    "use strict";
    
    var FindTrianglesAlgorithm = function(geometry, progressNotifier) {
        geometry.triangles = [];
                
        geometry.eachVertex(function(startVertexId) {
            WalkAlgorithm(this, startVertexId, function(currentVertexId, visited) {
                if (currentVertexId < visited[visited.length - 1]) {
                    return false;
                }
                
                if (2 === visited.length) {
                    if (-1 !== this.siblings[currentVertexId].indexOf(visited[0])) {                        
                        this.pushTriangle(visited[0], visited[1], currentVertexId);
                    }
                    
                    return false;
                }
            }, this);
            
            if (startVertexId % 4 === 0 && progressNotifier) {
                progressNotifier(geometry);
            }
        });
        
        if (progressNotifier) {
            progressNotifier(geometry);
        }
    };
    
    return FindTrianglesAlgorithm;
});