define(function() {
    "use strict";
    
    // radians/degrees conversion module
    (function(Math) {
        Math.RAD_TO_DEG = 180 / Math.PI;
        Math.DEG_TO_RAD = Math.PI / 180;
        
        function degreesAsm(stdlib, foreign, heap) {
            "use asm";
            
            var RAD_TO_DEG = +foreign.RAD_TO_DEG;
            
            function degrees(radians) {
                radians = +radians;
                
                return +(radians * RAD_TO_DEG);
            }
            
            return degrees;
        }
        
        function radiansAsm(stdlib, foreign, heap) {
            "use asm";
            
            var DEG_TO_RAD = +foreign.DEG_TO_RAD;
            
            function degrees(degrees) {
                degrees = +degrees;
                
                return +(degrees * DEG_TO_RAD);
            }
            
            return degrees;
        }

        Math.degrees = degreesAsm({Math: Math}, {RAD_TO_DEG: Math.RAD_TO_DEG});
        Math.radians = radiansAsm({Math: Math}, {DEG_TO_RAD: Math.DEG_TO_RAD});
    })(Math);

    // nearly equal module
    (function(Math) {
        function nearlyEqualAsm(stdlib) {
            "use asm";

            var abs = stdlib.Math.abs;

            function nearlyEqual(a, b) {
                a = +a;
                b = +b;

                var d       = 0.0, 
                    dM      = 0.0, 
                    epsilon = 0.000000119209290; 

                d = +abs(a - b);
                
                if (+abs(a) < +abs(b)) {
                    dM = +abs(a);
                } else {
                    dM = +abs(b);
                }
                
                if (+a == +b) {
                    return 1|0;
                } else if (+d < +epsilon) {
                    return 1|0;
                } else if (+d < (+dM * +epsilon)) {
                    return 1|0;
                }
                
                return 0|0;
            }

            return nearlyEqual;
        }

        Math.nearlyEqual = nearlyEqualAsm({Math: Math});
    })(Math);
    
    // consts module
    (function(Math) {
        Math.PI2 = Math.PI * 2.0;
        Math.PHI = (1 + Math.sqrt(5)) / 2;
    })(Math);
    
    return Math;
});
