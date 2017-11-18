define(function() {
    "use strict";
    
    var Material = function(parameters) {
        parameters || (parameters = {});
        
        this.parameters = parameters;
        
        this.compiled = {};
        this.pointers = {};
    };
    
    Material.prototype = {
        constructor: Material,
        
        parameters: {},
        attributes: [],
        uniforms:   [],
        shaders:    {
            'vertex':   '',
            'fragment': ''
        },
        
        compiled: {},
        pointers: {},
        
        procedures: {},
        
        isConfigured: false,
           
        configure: function(gl) {
            if (!this.isConfigured) {
                this.configureShaders   (gl);
                this.configureAttributes(gl);
                this.configureUniforms  (gl);
                
                this.isConfigured = true;
            }            
        },
        
        unconfigure: function(gl) {},
                
        configureShaders: function(gl) {
            var shaderProgram = gl.createProgram(),
                shaders  = this.shaders,
                compiled = this.compiled,
                vertexShader, fragmentShader;
              
            if (!compiled['vertex']) {
                vertexShader = Material.compileShader(gl, 'vertex', shaders['vertex']);
                gl.attachShader(shaderProgram, vertexShader);
                
                compiled['vertex'] = vertexShader;
            }
            
            if (!compiled['fragment']) {
                fragmentShader = Material.compileShader(gl, 'fragment', shaders['fragment']);
                gl.attachShader(shaderProgram, fragmentShader);
                
                compiled['fragment'] = fragmentShader;
            }
            
            gl.linkProgram(shaderProgram);
            
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                throw new Error('Unable to initialize the shader program.');
            }
            
            gl.useProgram(shaderProgram);
            
            this.compiled['program'] = shaderProgram;
        },
        
        configureAttributes: function(gl) {
            var attributes = this.attributes,
                pointers   = this.pointers,
                program    = this.compiled['program'],
                attributeName, pointer;
            
            for (var i = 0; i < attributes.length; ++i) {
                attributeName = attributes[i];
                pointer       = gl.getAttribLocation(program, attributeName);
                
                (function(program, attributeName) {
                    Object.defineProperty(pointers, attributeName, {
                        get: function() {
                            return gl.getAttribLocation(program, attributeName);
                        },
                        set: function() {}
                    });
                })(program, attributeName);
                
                gl.enableVertexAttribArray(pointer);
            }
        },
                
        configureUniforms: function(gl) {
            var uniforms = this.uniforms,
                pointers = this.pointers,
                program  = this.compiled['program'],
                uniformName;
            
            for (var i = 0; i < uniforms.length; ++i) {
                uniformName = uniforms[i];
                
                (function(program, uniformName) {
                    Object.defineProperty(pointers, uniformName, {
                        get: function() {
                            return gl.getUniformLocation(program, uniformName);
                        },
                        set: function() {}
                    });
                })(program, uniformName);
            }
        },
        
        // abstract
        setUniforms:   function(gl, geometry2D, geometryND, item, camera, canvas) {},
        setAttributes: function(gl, geometry2D, geometryND, item, camera, canvas) {}
    };
    
    Material.compileShader = function(gl, type, source) {
        var shader = gl.createShader('vertex' === type ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
         
        gl.shaderSource (shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('An error occurred compiling the ' + type + ' shader: ' + gl.getShaderInfoLog(shader));
        }
        
        return shader;
    };
    
    return Material;
});
