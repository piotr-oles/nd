define([
    'require',
    './Promise'
], function(require, Promise) {
    "use strict";
    
    var Thread = function(programName) {
        var fileName = require.toUrl('./Programs/' + programName + '.js');
        
        try {
            this.worker = new Worker(fileName);
        } catch(e) {
            throw new Error('Your browser doesn\'t support WebWorker feature.');
        }

        this.promise = new Promise();

        this.worker.addEventListener('message', function(event) {
            var data   = event.data,
                state  = data && 'state'  in data ? data.state  : 'done',
                result = data && 'result' in data ? data.result : data;
                
            switch (state) {
                case 'done':
                    this.promise.resolve([result], this);
                    break;
                case 'fail':
                    this.promise.reject ([result], this);
                    break;
                case 'progress':
                    this.promise.notify ([result], this);
                    break;
            }
        }.bind(this), false);

        this.worker.addEventListener('error', function(event) {
            this.promise.reject([event], this);
        }.bind(this));
        
        // create shortcuts
        this.then     = this.promise.then.bind(this.promise);
        this.done     = this.promise.done.bind(this.promise);
        this.fail     = this.promise.fail.bind(this.promise);
        this.progress = this.promise.progress.bind(this.promise);
        
        this.worker.postMessage({
            type: 'configure',
            input: {
                baseUrl: require.toUrl('')
            }
        });
    };
        
    Thread.prototype = {
        constructor: Thread,
        
        worker:  null,
        promise: null,
        
        execute: function(input) {
            return this.worker.postMessage({
                type:  'execute',
                input: input
            });
        },
        
        terminate: function() {
            return this.worker.terminate();
        }
    };
    
    return Thread;    
});