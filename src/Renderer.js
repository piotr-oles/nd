define([
    './WebGL'
], function(WebGL) {
    "use strict";
    
    var Renderer = function(options) {
        options || (options = {});
        
        options.mode || (options.mode = WebGL.TRIANGLES);
                
        this.mode = options.mode;        
    };
        
    Renderer.prototype = {
        constructor: Renderer,
        
        mode: WebGL.TRIANGLES,
        
        render: function(scene, camera, canvas, persists) {
            var gl = canvas.context;
            
            if (!persists) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }
            
            for (var name in scene.items) {
                var item       = scene.items[name],
                    geometryND = item.matrix ? item.geometry.transform(item.matrix) : item.geometry,
                    geometry2D = camera.projectGeometry(geometryND),
                    material   = item.material;
                
                material.configure(gl);
                
                material.setUniforms  (gl, geometry2D, geometryND, item, camera, canvas);
                material.setAttributes(gl, geometry2D, geometryND, item, camera, canvas);
                
                // store item vertex indices
                if (!('indices' in item.buffers)) {
                    item.buffers['indices'] = gl.createBuffer();
                    item.buffers['indices'].itemsLength = geometry2D.triangles.length;
                    
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry2D.triangles), gl.STATIC_DRAW);
                }
                  
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.buffers['indices']);
                gl.drawElements(this.mode, item.buffers['indices'].itemsLength, gl.UNSIGNED_SHORT, 0);
                
                material.unconfigure(gl);
            }
        }
    };
        
    return Renderer;
});