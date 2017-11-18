define([
    '../Primitives/Camera'
], function(Camera) {
    "use strict";
    // TODO
    var StereographicCamera = function(args) {
        Camera.call(this);
        
        args || (args = {});
        
        this.distance = 'distance' in args ? args.distance : 1000;
    };
    
    StereographicCamera.prototype = Object.create(Camera.prototype);
    
    StereographicCamera.prototype.distance = 1000;
        
    StereographicCamera.prototype.projectPoint = function(pointND) {
        var point2D = pointND.slice(0);

        for (var d = point2D.length; d > 2; --d) {
           // var distaceVector = Vector.build(d, 0.0);
           // distaceVector[d - 1] = this.distance;

          //  var pMatrix = Matrix.buildPerspective(distaceVector);
          //  point2D = Vector.transform(point2D, pMatrix);
            for (var i = 0; i < d - 1; ++i) {
                if (this.distance !== point2D[d - 1]) {
                    point2D[i] = point2D[i] * this.distance / (point2D[d - 1] - this.distance );
                } else {
                    point2D[i] *= Infinity;
                }
                //point2D[i] = (point2D[i] / (this.distance - point2D[d - 1])) * this.distance;
            }

            if (d > 3) {
                point2D.pop();
            }
        }
        
        for (var d = point2D.length; d < 3; ++d) {
            point2D.push(0);
        }

        return point2D;
    };
    
    return StereographicCamera;
});