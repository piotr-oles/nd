define([
    '../Math/Geometry',
    '../Algorithms/Geometry/ExpandByPermutationAlgorithm',
    '../Algorithms/Geometry/FindTrianglesAlgorithm'
], function(Geometry, ExpandByPermutationAlgorithm, FindTrianglesAlgorithm) {
    "use strict";
    
    var HyperOctahedronGeometry = function(args, progressNotifier) {
        args || (args = {});
        
        var dimension  = 'dimension'  in args ? args.dimension  : 3,
            radius     = 'radius'     in args ? args.radius     : 10,
            serialized = 'serialized' in args ? args.serialized : false;
                
        if (serialized) {
            Geometry.call(this, args);
        } else {
            Geometry.call(this, {
                dimension: 0
            });

            switch (dimension) {
                case 0:
                    this.addVertex([]);
                    break;
                default:
                    for (var i = 1; i <= dimension; ++i) {
                        ExpandByPermutationAlgorithm(this, -radius, +radius, progressNotifier);
                    }
                    
                    if (dimension > 2) {
                        FindTrianglesAlgorithm(this, progressNotifier);
                    } else {
                        this.pushTriangle(0, 2, 1);
                        this.pushTriangle(0, 1, 3);
                    }
            }
        }
    };
    
    HyperOctahedronGeometry.prototype = Object.create(Geometry.prototype);
    
    return HyperOctahedronGeometry;
});