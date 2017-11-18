define(function() {
    "use strict";
    
    // shim layer
    var requestAnimationFrame = (function() {
        return window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.msRequestAnimationFrame     || 
               function(callback) {
                   return window.setTimeout(callback, 14); // 14 ~ 1000 / 60 + 10
               };
    })();
    
    var cancelAnimationFrame = (function() {
        return window.cancelAnimationFrame       ||
               window.webkitCancelAnimationFrame ||
               window.mozCancelAnimationFrame    ||
               window.msCancelAnimationFrame     || 
               function(id) {
                   return window.clearTimeout(id);
               };
    })();
            
    var Animator = function(canvas, renderer, scene, camera, procedure) {
        this.canvas    = canvas;
        this.renderer  = renderer;
        this.scene     = scene;
        this.camera    = camera;
        this.procedure = procedure;
    };
    
    Animator.prototype = {
        constructor: Animator,
        
        index:     0,
        requestId: null,
        
        start: function() {
            this.tick();
        },
        
        stop: function() {
            if (null !== this.requestId) {
                cancelAnimationFrame(this.requestId);
                this.requestId = null;
            }
        },
        
        tick: function() {
            // Function.prototype.bind is slower...
            var self = this;
            
            this.requestId = requestAnimationFrame(function() {
                self.tick.call(self);
            });
            
            this.procedure.call(this);
        },
        
        frame: function(persist) {
            this.renderer.render(this.scene, this.camera, this.canvas, persist);
            ++this.index;
        }
    };
            
    return Animator;
});
