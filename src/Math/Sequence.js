define(function() {
    "use strict";
    
    var Sequence = function(formula) {
        this.formula = formula;
    };
    
    Sequence.prototype = {
        constructor: Sequence,
        
        slice: function(nA, nB) {
            var vector = [];
            
            for (var n = nA; n <= nB; ++n) {
                vector.push(this.formula(n));
            }
            
            return vector;
        },
        
        a: function(n) {
            return this.formula(n);
        },
        
        S: function(n) {
            var sum = 0;
            
            for (var i = 1; i <= n; ++i) {
                sum += this.formula(i);
            }
            
            return sum;
        }
    };
    
    return Sequence;
});