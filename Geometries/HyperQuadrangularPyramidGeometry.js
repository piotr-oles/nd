define([
    '../Math/Geometry',
    '../Math/Vector',
    './HyperCubeGeometry',
    '../Algorithms/Geometry/FindTrianglesAlgorithm'
], function(Geometry, Vector, HyperCubeGeometry, FindTrianglesAlgorithm) {
    "use strict";
    
    var HyperQuadrangularPyramidGeometry = function(args, progressNotifier) {
        args || (args = {});
        
        var dimension  = 'dimension'  in args ? args.dimension  : 3,
            size       = 'size'       in args ? args.size       : 10,
            height     = 'height'     in args ? args.height     : (size * Math.sqrt(dimension - 1)) / 2,
            serialized = 'serialized' in args ? args.serialized : false;
        
        if (serialized) {
            Geometry.call(this, args);
        } else {
            Geometry.call(this, {
                dimension: dimension
            });
            
            switch (dimension) {
                case 0:
                    this.vertexT = this.addVertex([]);
                    break;
                case 1:
                    this.vertexT = this.addVertex([0]);
                    break;
                default:
                    Geometry.inject(
                        new HyperCubeGeometry({
                            dimension: dimension - 1, 
                            size:      size
                        }), 
                        this
                    );
            
                    if (progressNotifier) {
                        progressNotifier(this);
                    }

                    var vectorT = Vector.build(dimension, 0),
                        vertexT;

                    vectorT[dimension - 1] = height;

                    this.vertexT = vertexT = this.addVertex(vectorT);

                    // connect with top
                    for (var vertexId = 0; vertexId < this.vectors.length; ++vertexId) {
                        if (vertexId !== vertexT) {
                            this.vectors[vertexId].push(0);
                            this.addEdge(vertexId, vertexT);
                            
                            if (progressNotifier) {
                                progressNotifier(this);
                            }
                        }
                    }

                    // reset triangles
                    this.triangles = [];

                    FindTrianglesAlgorithm(this, progressNotifier);
            }
        }
    };
    
    HyperQuadrangularPyramidGeometry.prototype = Object.create(Geometry.prototype);
    
    return HyperQuadrangularPyramidGeometry;
});