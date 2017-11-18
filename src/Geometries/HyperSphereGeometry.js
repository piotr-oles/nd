define([
    '../Math/Geometry',
    '../Math/Vector',
    '../Math/Extend',
    './HyperOctahedronGeometry'
], function(Geometry, Vector, Math, HyperOctahedronGeometry) {
    "use strict";
    
    var HyperSphereGeometry = function(args, progressNotifier) {        
        args || (args = {});
        
        var dimension  = 'dimension'  in args ? args.dimension  : 3,
            radius     = 'radius'     in args ? args.radius     : 5,
            factor     = 'factor'     in args ? args.factor     : 3,           
            serialized = 'serialized' in args ? args.serialized : false;
        
        if (serialized) {
            Geometry.call(this, args);
        } else {
            Geometry.call(this, {
                dimension: dimension
            });
        
            switch (dimension) {
                case 0:
                    this.addVertex([]);
                    break;
                case 1:
                    this.addVertex([0]);
                    break;
                default:
                    // build on hyperoctahedron
                    Geometry.inject(
                        new HyperOctahedronGeometry({
                            dimension: dimension,
                            radius:    radius
                        }), 
                        this
                    );
                    
                    if (progressNotifier) {
                        progressNotifier(this);
                    }

                    var trianglesLength, newTriangles,
                        vertexA,  vertexB,  vertexC,
                        vertexAB, vertexBC, vertexCA,
                        vectorA,  vectorB,  vectorC,
                        vectorAB, vectorBC, vectorCA;

                    for (var i = 0; i < factor; ++i) {
                        trianglesLength = this.triangles.length;
                        newTriangles    = [];

                        for (var trianglePointer = 0; trianglePointer < trianglesLength; trianglePointer += 3) {
                            vertexA = this.triangles[trianglePointer];
                            vertexB = this.triangles[trianglePointer + 1];
                            vertexC = this.triangles[trianglePointer + 2];

                            vectorA = this.vectors[vertexA];
                            vectorB = this.vectors[vertexB];
                            vectorC = this.vectors[vertexC];

                            vectorAB = Vector.resize(Vector.divideScalar(Vector.add(vectorA, vectorB), 2), radius);
                            vectorBC = Vector.resize(Vector.divideScalar(Vector.add(vectorB, vectorC), 2), radius);
                            //if (dimension > 2) {
                                vectorCA = Vector.resize(Vector.divideScalar(Vector.add(vectorC, vectorA), 2), radius);
                           // }
                            
                            vertexAB = this.addVertex(vectorAB);
                            vertexBC = this.addVertex(vectorBC);
                           // if (dimension > 2) {
                                vertexCA = this.addVertex(vectorCA);
                          //  }

                            this.removeEdge(vertexA, vertexB);
                            this.removeEdge(vertexB, vertexC);
                            this.removeEdge(vertexC, vertexA);

                            this.addEdge(vertexA,  vertexAB);
                            this.addEdge(vertexAB, vertexB);

                            this.addEdge(vertexB,  vertexBC);
                            this.addEdge(vertexBC, vertexC);

                            this.addEdge(vertexC,  vertexCA);
                            this.addEdge(vertexCA, vertexA);

                            this.addEdge(vertexAB, vertexBC);
                            this.addEdge(vertexBC, vertexCA);
                            this.addEdge(vertexCA, vertexAB);

                            newTriangles.push(vertexA,  vertexAB, vertexCA);
                            newTriangles.push(vertexB,  vertexBC, vertexAB);
                            newTriangles.push(vertexC,  vertexCA, vertexBC);
                            newTriangles.push(vertexAB, vertexBC, vertexCA);
                            
                            if (progressNotifier) {
                                progressNotifier(this);
                            }
                        }

                        this.triangles = newTriangles.slice(0);
                        
                        if (progressNotifier) {
                            progressNotifier(this);
                        }
                    }
            }
        }
    };
    
    HyperSphereGeometry.prototype = Object.create(Geometry.prototype);
    
    return HyperSphereGeometry;
});