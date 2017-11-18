define(function() {
    // Based on Promise implementation by [unscriptable.com / John Hann]

    var Promise = function() {
        this.thens     = [];
        this.notifiers = [];
    };

    Promise.prototype = {
        constructor: Promise,
        
        thens:     [],
        notifiers: [],
        
        then: function(onResolve, onReject) {
            this.thens.push({resolve: onResolve, reject: onReject});
            
            return this;
        },
        
        done: function(onResolve) {
            this.thens.push({resolve: onResolve, reject: null});
            
            return this;
        },
        
        fail: function(onReject) {
            this.thens.push({resolve: null, reject: onReject});
            
            return this;
        },
        
        progress: function(onProgress) {
            this.notifiers.push(onProgress);
            
            return this;
        },
        
        resolve: function(args, context) {
            if (!context) {
                context = this;
            }
            
            // switch over to sync then()
            this.then = function(onResolve, onReject) {
                onResolve && onResolve.apply(context, args);

                return this;
            };

            this.done = function(onResolve) {
                onResolve && onResolve.apply(context, args);

                return this;
            };
        
            this.progress = function(onProgress) {};
            
            // disallow multiple calls to resolve or reject
            this.resolve = this.reject = function() {
                throw new Error('Promise already completed.');
            };
        
            // complete all waiting (async) then()s
            for (var i = 0; i < this.thens.length; ++i) {
                this.thens[i].resolve && this.thens[i].resolve.apply(context, args);
            }
        
            delete this.thens;
            delete this.notifiers;
            
            return this;
        },
        
        reject: function(args, context) {
            if (!context) {
                context = this;
            }
            
            // switch over to sync then()
            this.then = function(onResolve, onReject) {
                onReject && onReject.apply(context, args);

                return this;
            };

            this.fail = function(onReject) {
                onReject && onReject.apply(context, args);

                return this;
            };
        
            this.progress = function(onProgress) {};
            
            // disallow multiple calls to resolve or reject
            this.resolve = this.reject = function() {
                throw new Error('Promise already completed.');
            };
        
            // complete all waiting (async) then()s
            for (var i = 0; i < this.thens.length; ++i) {
                this.thens[i].reject && this.thens[i].reject.apply(context, args);
            }
        
            delete this.thens;
            
            return this;
        },
        
        notify: function(args, context) {
            if (!context) {
                context = this;
            }
            
            for (var i = 0; i < this.notifiers.length; ++i) {
                this.notifiers[i] && this.notifiers[i].apply(context, args);
            }
            
            return this;
        }
    };

    return Promise;
});