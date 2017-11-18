define([
   './Vector'
], function(Vector) {
    "use strict";
    
    var Geometry = function(args) {
        args || (args = {});
                
        if ('serialized' in args && args.serialized) {
            this.unserialize(args);
        } else {
            this.dimension = 'dimension' in args ? args.dimension : 0;
                
            this.siblings  = [];
            this.vectors   = [];
            this.triangles = [];
            this.keys      = {};

            this.origin    = Vector.build(this.dimension, 0.0);
            
            this.estimate = {
                vertices:  0,
                triangles: 0
            };
        }
    };
    
    Geometry.prototype = {
        constructor: Geometry,
        
        dimension: 0,
        
        siblings:  [],
        vectors:   [],
        triangles: [],
        keys:      {},
        
        origin:    [],
        
        estimate: {
            vertices:  0,
            triangles: 0
        },
        
        addVertex: function(vector, siblings) {
            var vertexId = this.vectors.length;
            
            this.siblings[vertexId] = (siblings || []);
            this.vectors [vertexId] = (vector   || []);
            
            var vectorKey = Vector.toString(vector || []);
            
            if (!(vectorKey in this.keys)) {
                this.keys[vectorKey] = [];
            }
            
            this.keys[vectorKey].push(vertexId);
                        
            return vertexId;
        },
        
        getVertex: function(vertexId) {
            return {
                siblings: this.siblings[vertexId],
                vector:   this.vectors [vertexId]
            };
        },
                
        removeVertex: function(vertexId) {
            var vertexSiblings       = this.siblings[vertexId],
                vertexSiblingsLength = vertexSiblings.length,
                vectorKey            = Vector.toString(this.vectors[vertexId]),
                siblingId;
            
            for (var i = 0; i < vertexSiblingsLength; ++i) {
                siblingId = vertexSiblings[i];
                
                this.siblings[siblingId] = this.siblings[siblingId].filter(function(currentId) {
                    return currentId !== vertexId;
                });
            }
            
            this.keys[vectorKey] = this.keys[vectorKey].filter(function(currentId) {
                return currentId !== vertexId;
            });
                        
            this.siblings[vertexId] = undefined;
            this.vectors [vertexId] = undefined;
        },
        
        removeVertices: function() {
            this.siblings  = [];
            this.vectors   = [];
            this.triangles = [];
            this.keys      = {};
        },
                        
        addEdge: function(vertexIdA, vertexIdB) {
            this.siblings[vertexIdA].push(vertexIdB);
            this.siblings[vertexIdB].push(vertexIdA);
        },
                
        removeEdge: function(vertexIdA, vertexIdB) {
            this.siblings[vertexIdA] = this.siblings[vertexIdA].filter(function(vertexId) {
                return vertexId !== vertexIdB;
            });
            
            this.siblings[vertexIdB] = this.siblings[vertexIdB].filter(function(vertexId) {
                return vertexId !== vertexIdA;
            });
        },
        
        removeEdges: function() {
            this.siblings = [];
        },
                
        pushTriangle: function(vertexA, vertexB, vertexC) {
            this.triangles.push(vertexA, vertexB, vertexC);
        },
        
        unshiftTriangle: function(vertexA, vertexB, vertexC) {
            this.triangles.unshift(vertexA, vertexB, vertexC);
        },
        
        shiftTriangle: function() {
            var triangle = [
                this.triangles.shift(),
                this.triangles.shift(),
                this.triangles.shift()
            ];
            
            return triangle;
        },
        
        getTriangle: function(pointer) {
            var triangles = this.triangles;
            
            return [
                this.triangles[pointer    ],
                this.triangles[pointer + 1],
                this.triangles[pointer + 2]
            ];
        },
        
        removeTriangles: function() {
            this.triangles = [];
        },
        
        eachVertex: function(callback, context) {
            var siblings = this.siblings;
            
            context || (context = this);
            
            var verticesLength = this.vectors.length;

            for (var vertexId = 0; vertexId < verticesLength; ++vertexId) {
                if (
                    undefined !== siblings[vertexId] &&
                    false === callback.call(context, vertexId)
                ) {
                    break;
                }
            }
        },
        
        eachEdge: function(callback, context) {
            var siblings = this.siblings,
                vertexSiblings, vertexSiblingsLength;
            
            context || (context = this);
            
            var verticesLength = this.vectors.length;

            for (var vertexId = 0; vertexId < verticesLength; ++vertexId) {
                if (undefined !== siblings[vertexId]) {
                    vertexSiblings       = siblings[vertexId];
                    vertexSiblingsLength = vertexSiblings.length;

                    for (var i = 0; i < vertexSiblingsLength; ++i) {
                        if (vertexSiblings[i] > vertexId &&
                            false === callback.call(context, vertexId, vertexSiblings[i]))
                        {
                            break;
                        }
                    }
                }
            }            
        },
        
        eachTriangle: function(callback, context) {
            var triangles       = this.triangles,
                trianglesLength = triangles.length;
        
            context || (context = this);
            
            for (var trianglePointer = 0; trianglePointer < trianglesLength; trianglePointer += 3) {
                if (false === callback.call(context, trianglePointer)) {
                    break;
                }
            }
        },
        
        transform: function(matrix) {
            var transformed = Geometry.clone(this),
                vectors     = transformed.vectors;
        
            transformed.eachVertex(function(vertexId) {
                vectors[vertexId] = Vector.transform(vectors[vertexId], matrix);
            });
            
            return transformed;
        },
        
        findByVector: function(vectorA, sourceVertex) {
            var vectors       = this.vectors,
                vectorKey     = Vector.toString(vectorA),
                candidates    = this.keys[vectorKey],
                foundVertexId = -1,
                candidatesLength,
                vertexId;
            
            if (candidates) {
                candidatesLength = candidates.length;
                
                if (candidatesLength) {
                    for (var i = 0; i < candidatesLength; ++i) {
                        vertexId = candidates[i];
                        
                        if (Vector.nearlyEqual(vectors[vertexId], vectorA)) {
                            foundVertexId = vertexId;
                            break;
                        }
                    }
                }
            }
            
            return foundVertexId;
        },
        
        mergeVertices: function(vertexIdA, vertexIdB) {
            var siblings = this.siblings,
                diff     = siblings[vertexIdB].filter(function(siblingVertexId) {
                    return -1 === siblings[vertexIdA].indexOf(siblingVertexId);
                });
            
            siblings[vertexIdA] = siblings[vertexIdA].concat(diff);
            
            this.removeVertex(vertexIdB);
            
            return vertexIdA;
        },
        
        refreshKeys: function() {
            var vectors = this.vectors,
                keys    = {},
                vectorKey;
        
            this.eachVertex(function(vertexId) {
                vectorKey = Vector.toString(vectors[vertexId]);
                
                if (!(vectorKey in keys)) {
                    keys[vectorKey] = [];
                }
                
                keys[vectorKey].push(vertexId | 0);
            });
            
            this.keys = keys;
        },
        
        optimize: function() {
            var shifts = {},
                i      = 0;
            
            this.eachVertex(function(vertexId) {
                shifts[vertexId] = vertexId - i++;
            });
            
            this.siblings = this.siblings.filter(function(siblings) {
                undefined !== siblings;
            });
            
            this.vectors = this.vectors.filter(function(siblings) {
                undefined !== siblings;
            });
            
            this.eachVertex(function(vertexId) {
                this.siblings[vertexId] = this.siblings[vertexId].map(function(siblingId) {
                    return siblingId - shifts[siblingId];
                });
            });
        },
        
        serialize: function() {
            return {
                dimension: this.dimension,

                siblings:  this.siblings,
                vectors:   this.vectors,
                triangles: this.triangles,
                keys:      this.keys,
                origin:    this.origin,
                estimate:  this.estimate,
                
                serialized: true
            };
        },
        
        unserialize: function(data) {
            this.dimension = data.dimension;

            this.siblings  = data.siblings;
            this.vectors   = data.vectors,
            this.triangles = data.triangles,
            this.keys      = data.keys,
            this.origin    = data.origin;
            this.estimate  = data.estimate;
        },
        
        countVertices: function() {
            return this.vectors.length;
        },
        
        countTriangles: function() {
            return Math.floor(this.triangles.length / 3);
        }
    };
    
    Geometry.buildEmpty = function() {
        var geometry = new Geometry({dimension: 0});
        geometry.addVertex([]);
        
        return geometry;
    };
    
    Geometry.clone = function(sourceGeometry, deep) {
        var targetGeometry  = new Geometry({dimension: sourceGeometry.dimension}),
            sourceVectors   = sourceGeometry.vectors,
            sourceSiblings  = sourceGeometry.siblings,
            targetVectors   = targetGeometry.vectors,
            targetSiblings  = targetGeometry.siblings;
        
        var verticesLength = sourceGeometry.vectors.length;

        for (var vertexId = 0; vertexId < verticesLength; ++vertexId) {
            targetVectors[vertexId] = sourceVectors[vertexId] ? sourceVectors[vertexId].slice(0) : undefined;

            if (deep) {
                targetSiblings[vertexId] = sourceSiblings[vertexId] ? sourceSiblings[vertexId].slice(0) : undefined;
            }
        }
        
        if (deep) {
            targetGeometry.triangles = sourceGeometry.triangles.slice(0);
        } else {
            targetGeometry.siblings  = sourceGeometry.siblings;
            targetGeometry.triangles = sourceGeometry.triangles;
        }
                
        return targetGeometry;        
    };
    
    Geometry.inject = function(sourceGeometry, targetGeometry) {
        for (var vertexId = 0; vertexId < sourceGeometry.vectors.length; ++vertexId) {
            targetGeometry.vectors [vertexId] = sourceGeometry.vectors[vertexId];
            targetGeometry.siblings[vertexId] = sourceGeometry.siblings[vertexId];
        }
        
        for (var vectorKey in sourceGeometry.keys) {
            targetGeometry.keys[vectorKey] = sourceGeometry.keys[vectorKey];
        }
        
        targetGeometry.triangles = sourceGeometry.triangles.slice(0);
    };
        
    Geometry.reduce = function(geometry) {
        var vectors = geometry.vectors,
            twinVertexId;
        
        geometry.eachVertex(function(vertexId) {
            twinVertexId = geometry.findByVector(vectors[vertexId], vertexId);
            
            if (-1 !== twinVertexId) {
                geometry.mergeVertices(vertexId, twinVertexId);
            }
        });
    };
        
    return Geometry;
});
