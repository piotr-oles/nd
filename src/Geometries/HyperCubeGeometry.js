define([
    '../Math/Geometry',
    '../Algorithms/Geometry/ExpandByTranslationAlgorithm',
    '../Algorithms/Geometry/FindFacesAlgorithm'
], function(Geometry, ExpandByTranslationAlgorithm, FindFacesAlgorithm) {
    "use strict";
    
    var HyperCubeGeometry = function(args, progressNotifier) {
        args || (args = {});
        
        var dimension  = 'dimension'  in args ? args.dimension  : 3,
            size       = 'size'       in args ? args.size       : 10,
            serialized = 'serialized' in args ? args.serialized : false;
        
        if (serialized) {
            Geometry.call(this, args);
        } else {
            Geometry.call(this, {
                dimension: 0
            });
            
            this.estimate = {
                vertices:  Math.pow(2, dimension),
                triangles: Math.pow(2, dimension - 2) * (dimension - 1) * (dimension)
            };
        
            // root vertex
            this.addVertex([]);

            for (var i = 0; i < dimension; ++i) {
                ExpandByTranslationAlgorithm(this, -size, size, progressNotifier);
            }
            
            FindFacesAlgorithm(this, progressNotifier);
        }  
    };
    
    HyperCubeGeometry.prototype = Object.create(Geometry.prototype);
    
    return HyperCubeGeometry;
});