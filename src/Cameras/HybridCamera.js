define([
    '../Primitives/Camera'
], function(Camera) {
    "use strict";
    
    var HybridCamera = function(args) {
        Camera.call(this);
        
        args || (args = {});
        
        this.distance = 'distance' in args ? args.distance : 1000;
    };
    
    HybridCamera.prototype = Object.create(Camera.prototype);
    
    HybridCamera.prototype.distance = 1000;
    
    HybridCamera.prototype.projectPoint = function(pointND) {
        var point2D = pointND.slice(0);
        
        // ortogonal for hyper dimensions
        for (var d = point2D.length; d > 3; --d) {
            point2D.pop();
        }
        
        // perspective for 3th dimension
        if (point2D.length === 3) {
            point2D[0] = (point2D[0] * this.distance) / (point2D[2] + this.distance);
            point2D[1] = (point2D[1] * this.distance) / (point2D[2] + this.distance);
        }

        for (var d = point2D.length; d < 3; ++d) {
            point2D.push(0);
        }

        return point2D;
    };
    
    return HybridCamera;
});