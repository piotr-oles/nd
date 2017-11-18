define([
    '../Math/Matrix',
    '../Math/Vector',
    '../Math/Sequence',
    '../Math/Extend'
], function(Matrix, Vector, Sequence, Math) {
    "use strict";
    
    var Item = function(geometry, material, data) {
        this.geometry = geometry;
        this.material = material;
        
        this.data       = data || {};
        this.buffers    = {};
        this.transforms = {
            'scales':       [],
            'translations': [],
            'rotations':    {}
        };
    };
    
    Item.prototype = {
        constructor: Item,
        
        geometry: null,
        material: null,
        
        data:       {},
        buffers:    {},
        transforms: {},
        matrix:     null,
                
        transform: function(matrix, apply) {
            var transformed = this.geometry.transform(matrix);
            
            if (apply) {
                this.geometry = transformed;
                return this;
            } else {
                return transformed;
            }
        },
        
        get: function(key, defaultValue) {
            return (undefined === this.data[key]) ? defaultValue : this.data[key];
        },
        
        set: function(key, value) {
            this.data[key] = value;

            return this;
        },
        
        has: function(key) {
            return undefined !== this.data[key];
        },
        
        remove: function(key) {
            delete this.data[key];

            return this;
        },
        
        clear: function() {
            this.data = {};
            
            return this;
        },
        
        get scales() {
            return this.transforms.scales.slice(0);
        },
        
        get scalesCanonic() {
            var dimension     = this.geometry.dimension,
                canonicScales = Vector.build(dimension, 1.0),
                currentScales = this.transforms.scales;
        
            for (var dIndex = 0; dIndex < currentScales.length && dIndex < dimension; ++dIndex) {
                if (undefined !== currentScales[dIndex]) {
                    canonicScales[dIndex] = currentScales[dIndex];
                }
            }
            
            return canonicScales;
        },
        
        getScale: function(dimension) {
            var scales = this.transforms.scales;
            
            return (dimension in scales) ? scales[dimension] : 1.0;
        },
        
        scale: function(scales) {
            this.transforms.scales = scales.slice(0);
            
            return this;
        },
        
        get translations() {
            return this.transforms.translations.slice(0);
        },
        
        get translationsCanonic() {
            var dimension           = this.geometry.dimension,
                canonicTranslations = Vector.build(dimension, 0.0),
                currentTranslations = this.transforms.translations;
        
            for (var dIndex = 0; dIndex < currentTranslations.length && dIndex < dimension; ++dIndex) {
                if (undefined !== currentTranslations[dIndex]) {
                    canonicTranslations[dIndex] = currentTranslations[dIndex];
                }
            }
            
            return canonicTranslations;
        },
        
        getTranslation: function(dimension) {
            var translations = this.transforms.translations;
            
            return (dimension in translations) ? translations[dimension] : 0.0;
        },
        
        translate: function(translations) {
            this.transforms.translations = translations.slice(0);
            
            return this;
        },
        
        get rotations() {
            return JSON.parse(JSON.stringify(this.transforms.rotations));
        },
        
        // avoid using this function - O(d^2), where d is dimension of mesh geometry
        get rotationsCanonic() {
            var dimension        = this.geometry.dimension,
                canonicRotations = {},
                currentRotations = this.transforms.rotations,
                axesCombinations = Math.combinations((new Sequence(function(n) { return n; })).slice(0, dimension - 1), 2),
                axisA, axisB, axesHash;
            
            for (var i = 0; i < axesCombinations.length; ++i) {
                axisA = axesCombinations[i][0];
                axisB = axesCombinations[i][1];
                                
                axesHash = createAxesHash(axisA, axisB);
                
                canonicRotations[axesHash] = 0.0;
            }
            
            for (var i = 0; i < currentRotations.length; ++i) {
                axisA = currentRotations[i][0];
                axisB = currentRotations[i][1];
                                
                axesHash = createAxesHash(axisA, axisB);
                
                canonicRotations[axesHash] = currentRotations[i][2];
            }
            
            return canonicRotations;
        },
        
        getRotation: function(axisA, axisB) {
            var rotations = this.transforms.rotations,
                axesHash  = createAxesHash(axisA, axisB);
            
            return (axesHash in rotations) ? rotations[axesHash] : 0.0;
        },
                
        rotate: function(rotations) {
            this.transforms.rotations = JSON.parse(JSON.stringify(rotations));
            
            return this;
        },
        
        rotateAxis: function(axisA, axisB, theta) {
            var axesHash = createAxesHash(axisA, axisB);
            
            this.transforms.rotations[axesHash] = theta;
            
            return this;
        },
        
        update: function() {
            var rotations = this.transforms.rotations,
                dimension = this.geometry.dimension,
                origin    = this.geometry.origin,
                axes, theta;
        
            var scaleVector       = this.scalesCanonic,
                translationVector = this.translationsCanonic,
                rotationMatrices  = [];
                        
            for (var axesHash in rotations) {
                axes  = parseAxesHash(axesHash);
                theta = rotations[axesHash];
                
                if (axes[0] < dimension) {
                    rotationMatrices.push(
                         Matrix.buildRotation(dimension, axes[0], axes[1], Math.radians(theta), origin)
                    );
                }
            }
            
            this.matrix = Matrix.compose(
                dimension,
                Matrix.buildScale(scaleVector),
                Matrix.buildTranslation(translationVector),
                rotationMatrices.length > 1 ? Matrix.multiplyBulk(rotationMatrices) : rotationMatrices[0]
            );
    
            return this;
        },
        
        reset: function() {
            this.transforms = {
                'scales':       [],
                'translations': [],
                'rotations':    {}
            };
            
           return this;
        }
    };
    
    var createAxesHash = function(axisA, axisB) {
        var axisTemp;
        
        if (axisB > axisA) {
            axisTemp = axisB;

            axisB = axisA;
            axisA = axisTemp;
        }
        
        return axisA + 'x' + axisB;
    };
    
    var parseAxesHash = function(axesHash) {
        return axesHash.split('x').map(function(axis) { return parseInt(axis); });
    };
    
    return Item;
});
