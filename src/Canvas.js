define(function() {
    "use strict";
    
    var Canvas = function(element, width, height) {        
        this.element          = element || document.createElement('canvas');
        this.devicePixelRatio = window.devicePixelRatio || 1;
        
        this.setSize(
            width  || this.element.width, 
            height || this.element.height
        );
        
        this.initContext({
            preserveDrawingBuffer: true
        });
        
        this.configureContext();
    };
    
    Canvas.prototype = {
        constructor: Canvas,
        
        element: null,
        context: {},
        
        width:  0,
        height: 0,
        
        setElement: function(element) {
            this.element = element;
            this.setSize(element.width, element.height);
            
            this.initContext({
                preserveDrawingBuffer: true
            });
            
            this.configureContext();
        },
        
        setSize: function(width, height) {
            var deviceWidth  = width  * this.devicePixelRatio, 
                deviceHeight = height * this.devicePixelRatio;

            this.element.width  = deviceWidth;
            this.element.height = deviceHeight;

            this.element.style.width  = width  + 'px';
            this.element.style.height = height + 'px';
            
            this.width  = deviceWidth;
            this.height = deviceHeight;
            
            return this;
        },
        
        shaders: {
            program:  null,
            vertex:   null,
            fragment: null
        },
        
        initContext: function(options) {
            options || (options = {});
            
            this.context = this.element.getContext('webgl',              options) || 
                           this.element.getContext('experimental-webgl', options);
            
            if (!this.context) {
                throw new Error('WebGL is not supported by this browser.');
            }
        },
        
        configureContext: function() {
            var gl = this.context;
            
            gl.viewport(0, 0, this.width, this.height);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
        }
    };
    
    return Canvas;
});