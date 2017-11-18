define([
    '../Primitive/Material',
    '../Math/Vector'
], function(Material, Vector) {
    var HyperDepthMaterial = function(parameters) {
        parameters || (parameters = {});
        
        if (!('hyperDepth' in parameters)) {
            parameters['hyperDepth'] = 100;
        }
        
        Material.call(this, parameters);
    };
    
    HyperDepthMaterial.prototype = Object.create(Material.prototype);
        
    HyperDepthMaterial.prototype.configure = function(gl) {
        Material.prototype.configure.call(this, gl);
        
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.cullFace(gl.FRONT_AND_BACK);
    };
    
    HyperDepthMaterial.prototype.unconfigure = function(gl) {
        Material.prototype.unconfigure.call(this, gl);
        
        gl.disable(gl.BLEND);
    };
    
    HyperDepthMaterial.prototype.uniforms   = ['uObjectHyperRatio', 'uObjectDepthRatio'];
    HyperDepthMaterial.prototype.attributes = ['aVertexPosition', 'aVertexHyper'];
    
    HyperDepthMaterial.prototype.shaders['vertex'] = [
        'precision highp float;',

        'attribute vec3 aVertexPosition;',
        'attribute vec3 aVertexHyper;',

        'varying vec3 vertexHyper;',
                
        'void main(void) {',
            'gl_PointSize = 3.0;',
            'gl_Position = vec4(aVertexPosition, 1.0);',
            
            'vertexHyper = aVertexHyper;',
        '}'
    ].join("\n");
    
    HyperDepthMaterial.prototype.shaders['fragment'] = [
        'precision highp float;',

        'uniform float uObjectHyperRatio;',
        'uniform float uObjectDepthRatio;',

        'varying vec3 vertexHyper;',
        
        'float normalizeColor(float position) {',
            'float positive = ((position + 1.0) * uObjectDepthRatio / 2.0);',
            
            'return clamp(positive, 0.0, 1.0);',
        '}',
        
        'void main(void) {',
            'gl_FragColor = vec4(',
                'normalizeColor(vertexHyper.r) * pow(uObjectHyperRatio, 1.44),',
                'normalizeColor(vertexHyper.g) * pow(uObjectHyperRatio, 1.44),',
                'normalizeColor(vertexHyper.b) * pow(uObjectHyperRatio, 1.44),',
                'pow(uObjectHyperRatio, 1.1)',
            ');',
        '}'
    ].join("\n");
            
    HyperDepthMaterial.prototype.setUniforms = function(gl, geometry2D, geometryND, item, camera, canvas) {
        if (this.pointers['uObjectHyperRatio']) {
            gl.uniform1f(this.pointers['uObjectHyperRatio'], 1.0 / Math.max(2, (geometryND.dimension - 2)));
        }
        
        if (this.pointers['uObjectDepthRatio']) {
            var scaleRatio = Vector.arithmeticAverage(item.scales);
            
            if (isNaN(scaleRatio)) {
                scaleRatio = 1.0;
            }
            
            gl.uniform1f(this.pointers['uObjectDepthRatio'], 1.0 / (this.parameters['hyperDepth'] * scaleRatio));
        }
    };
    
    HyperDepthMaterial.prototype.setAttributes = function(gl, geometry2D, geometryND, item, camera, canvas) {
        var ratioX = 2 / canvas.width,
            ratioY = 2 / canvas.height,
            ratioZ = 2 / camera.distance;
        
        // position attribute
        if (!('vectors' in item.buffers)) {
            item.buffers['vectors'] = gl.createBuffer();
        }
                
        var vectorsBuffer = item.buffers['vectors'],
            vectorsFlat   = [];
    
        geometry2D.eachVertex(function(vertexId) {
            var vector = this.vectors[vertexId];
            vectorsFlat.push(vector[0] * ratioX, vector[1] * ratioY, vector[2] * ratioZ);
        });
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vectorsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vectorsFlat), gl.DYNAMIC_DRAW);
        
        gl.vertexAttribPointer(this.pointers['aVertexPosition'], 3, gl.FLOAT, false, 0, 0);

        // hyper attribute
        if (!('hyper' in item.buffers)) {
            item.buffers['hyper'] = gl.createBuffer();
        }
            
        var hypersBuffer    = item.buffers['hyper'],
            hypersFlat      = [],
            hypersDimension = [this.parameters['hyperR'], this.parameters['hyperG'], this.parameters['hyperB']];
    
        geometryND.eachVertex(function(vertexId) {
            var hyper = geometryND.vectors[vertexId];

            for (var i = 0; i < 3; ++i) {
                if (hypersDimension[i] !== 0 && hypersDimension[i] <= hyper.length) {
                    hypersFlat.push(hyper[hypersDimension[i] - 1]);
                } else {
                    hypersFlat.push(0.0);
                }
            }
        }.bind(this));
                
        gl.bindBuffer(gl.ARRAY_BUFFER, hypersBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hypersFlat), gl.DYNAMIC_DRAW);

        gl.vertexAttribPointer(this.pointers['aVertexHyper'], 3, gl.FLOAT, false, 0, 0);
    };
    
    return HyperDepthMaterial;
});