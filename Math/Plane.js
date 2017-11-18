define([
    './Vector',
    './Extend'
],
function(Vector, Math) {
    "use strict";
    
    /**
     * Parametric hyperplane equation
     */
    var Plane = {
        /**
         * Build hyperplane equation based on three vectors
         * 
         * @param {Array} vectorA
         * @param {Array} vectorB
         * @param {Array} vectorC
         * @returns {Object|null}
         */
        buildEquation: function(vectorA, vectorB, vectorC) { // x = A + λAB + μAC
            var AB = Vector.subtract(vectorB, vectorA),
                AC = Vector.subtract(vectorC, vectorA),
                λR = null,
                μR = null;
                
            if (Math.nearlyEqual(Vector.cosinus(AB, AC), 1)) { // are parallel
                return null;
            }
            
            // search for λ non zero row
            for (var i = 0; i < AB.length; ++i) {
                if (!Math.nearlyEqual(AB[i], 0)) {
                    λR = i;
                    break;
                }
            }
            
            // search for μ non zero row
            for (var i = 0; i < AC.length; ++i) {
                if (i !== λR && !Math.nearlyEqual(AC[i], 0)) {
                    μR = i;
                    break;
                }
            }
            
            if (null === λR || null === μR) { // not enough data
                return null;
            } else {
                return {
                    'A':  vectorA, 
                    'AB': AB, 
                    'AC': AC,
                    'λR': λR,
                    'μR': μR
                };
            }
        },
        
        /**
         * Check if vectorX satisfies hyperplane equation
         * 
         * @param {Array} vectorX
         * @param {Object} params
         * @returns {Boolean}
         */
        satisfiesEquation: function(vectorX, params) {
            var A  = params['A'],
                AB = params['AB'],
                AC = params['AC'],
                λR = params['λR'],
                μR = params['μR'],
                AX = Vector.subtract(vectorX, A),
                eqλ, eqμ, λ, μ;
            
            // resolve 2 equations to find λ and μ
            eqλ = [AX[λR], AB[λR], AC[λR]];
            eqμ = [AX[μR], AB[μR], AC[μR]];
            
            eqλ[0] /= eqλ[1];
            eqλ[2] /= eqλ[1];
            eqλ[1]  = 1;

            eqμ[0] -= eqμ[1] * eqλ[0];
            eqμ[2] -= eqμ[1] * eqλ[2];
                        
            μ = eqμ[0] / eqμ[2];
            λ = eqλ[0] - eqλ[2] * μ;
                        
            return Vector.nearlyEqual(
                AX,
                Vector.add(
                    Vector.multiplyScalar(AB, λ),
                    Vector.multiplyScalar(AC, μ)
                )
            );
        }
    
    };
        
    return Plane;
});
