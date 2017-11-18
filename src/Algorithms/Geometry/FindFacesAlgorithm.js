define([
    './WalkAlgorithm',
    './TriangulateAlgorithm',
    '../../Math/Plane',
    '../../Math/Extend'
], function(WalkAlgorithm, TriangulateAlgorithm, Plane, Math) {
    "use strict";
    
    var FindFacesAlgorithm = function(geometry, progressNotifier) {
        geometry.triangles = [];
        
        var face, triangles;
        
        geometry.eachVertex(function(startVertexId) {
            var foundCycles     = [],
                planeParameters = null;
            
            WalkAlgorithm(this, startVertexId, function(currentVertexId, visited) {
                if (currentVertexId < startVertexId) {
                    return false;
                }
                
                var vectors  = this.vectors,
                    siblings = this.siblings;
                
                if (visited.length >= 3) {
                    if (null === planeParameters) {
                        var verticesCombinations = Math.combinations(visited, 3);

                        for (var i = 0; i < verticesCombinations.length && null === planeParameters; ++i) {
                            planeParameters = Plane.buildEquation(
                                vectors[verticesCombinations[i][0]],
                                vectors[verticesCombinations[i][1]],
                                vectors[verticesCombinations[i][2]]
                            );
                        }
                    }
                    
                    if (null !== planeParameters) {
                        if (!Plane.satisfiesEquation(vectors[currentVertexId], planeParameters)) {
                            planeParameters = null;
                            return false;
                        }
                    }
                }
                                
                if (visited.length >= 2) {
                    if (-1 !== siblings[currentVertexId].indexOf(visited[0]) && 
                        -1 === foundCycles.indexOf(currentVertexId))
                    {
                        face      = visited.concat([currentVertexId]);
                        triangles = TriangulateAlgorithm(face);
                        
                        for (var i = 0; i < triangles.length; ++i) {
                            this.pushTriangle(triangles[i][0], triangles[i][1], triangles[i][2]);
                        }
                        
                        foundCycles.push(visited[1]);
                        
                        return false;
                    }
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
    
    return FindFacesAlgorithm;
});