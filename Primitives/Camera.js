define([
    '../Math/Geometry'
], function(Geometry) {
    "use strict";
    
    var Camera = function() {};
    
    Camera.prototype = {
        constructor: Camera,
        
        projectPoint: function(pointND) {
            var point2D = pointND.slice(0);
            
            for (var d = point2D.length; d > 2; ++d) {
                point2D.pop();
            }
            
            for (var d = point2D.length; d < 3; ++d) {
                point2D.push(0);
            }
            
            return point2D;
        },
                
        projectGeometry: function(geometryND) {
            var geometry2D     = Geometry.clone(geometryND),
                verticesLength = geometry2D.vectors.length;
            
            for (var vertexId = 0; vertexId < verticesLength; ++vertexId) {
                if (undefined !== geometry2D.vectors[vertexId]) {
                    geometry2D.vectors[vertexId] = this.projectPoint(geometry2D.vectors[vertexId]);
                }
            }
            
            return geometry2D;
        }
    };
    
    return Camera;
});