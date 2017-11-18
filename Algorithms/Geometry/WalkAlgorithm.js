define(function() {
    "use strict";
    
    var WalkAlgorithm = function(geometry, vertexId, callback, context, visited) {
        visited || (visited = []);
        context || (context = geometry);
        
        var siblings       = geometry.siblings[vertexId],
            siblingsLength = siblings.length;
        
        visited.push(vertexId);
        
        for (var i = 0; i < siblingsLength; ++i) {
            if (visited.length > 1 && visited[visited.length - 2] === siblings[i]) {
                continue;
            }
            
            if (-1 === visited.indexOf(siblings[i]) && false !== callback.call(context, siblings[i], visited)) {
                WalkAlgorithm(geometry, siblings[i], callback, context, visited.slice(0));
            }
        }
    };
    
    return WalkAlgorithm;
});