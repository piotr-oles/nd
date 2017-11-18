importScripts('../../libs/require.js');

// main
addEventListener('message', function(event) {
    var type  = event.data.type,
        input = event.data.input;
    
    switch (type) {
        case 'configure':
            require.config({
                baseUrl: input.baseUrl.split('?')[0] // remove bust arg
            });            
            
            break;
        case 'execute':
            var geometryName = input.geometry,
                geometryArgs = input.args;
                
            require(['nd/Geometries/' + geometryName], function(GeometryClass) {
                var progressNotifier = function(geometry) {
                    var estimate  = geometry.estimate,
                        current   = {
                            vertices:  geometry.countVertices(),
                            triangles: geometry.countTriangles()
                        };

                    if (0 !== estimate.vertices && 0 !== estimate.triangles) {
                        postMessage({
                            state:  'progress',
                            result: {
                                vertices:  [estimate.vertices,  current.vertices ],
                                triangles: [estimate.triangles, current.triangles]
                            }
                        });
                    }
                };

                var geometry = new GeometryClass(geometryArgs, progressNotifier);

                postMessage({
                    state:  'done',
                    result: geometry.serialize() 
                });
            });
            break;
    }
    
    
}, false);