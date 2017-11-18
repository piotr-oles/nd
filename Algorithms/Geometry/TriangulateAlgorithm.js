define(function() {
    "use strict";
    
    // todo - too naive triangulation
    var TriangulateAglorithm = function(face) {
        var triangles = [],
            start     = face[0];
            
        for (var i = 1; i < face.length - 1; ++i) {
            triangles.push([start, face[i], face[i + 1]]);
        }
        
        return triangles;
    };
    
    return TriangulateAglorithm;
});