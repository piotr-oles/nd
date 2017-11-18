define([
    '../Primitives/Camera'
], function(Camera) {
    "use strict";
    
    var OrtographicCamera = function(args) {
        Camera.call(this);
        
        args || (args = {});
        
        this.distance = 'distance' in args ? args.distance : 1000;
    };
    
    OrtographicCamera.prototype = Object.create(Camera.prototype);
    
    OrtographicCamera.prototype.distance = 1000;
    
    OrtographicCamera.prototype.projectPoint = function(pointND) {
        var point2D = pointND.slice(0);
        
        for (var d = point2D.length; d > 3; --d) {
            point2D.pop();
        }
        
        for (var d = point2D.length; d < 3; ++d) {
            point2D.push(0);
        }
        
        point2D[2] = 1;

        return point2D;
    };
    
    return OrtographicCamera;
});