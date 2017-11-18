define(function() {
    "use strict";
    
    var Scene = function() {
        this.items = {};
    };
    
    Scene.prototype = {
        constructor: Scene,
        
        items:  {},
        hidden: {}
    };
    
    return Scene;
});
