
export class Thread {
  private worker: Worker;
  private promise: Promise;

  constructor(programName: string) {
    const fileName = require.toUrl('./Programs/' + programName + '.js');

    try {
      this.worker = new Worker(fileName);
    } catch (e) {
      throw new Error('Your browser doesn\'t support WebWorker feature.');
    }

    this.promise = new Promise();
    this.worker.addEventListener('message', (event) => {
      const data = event.data;
      const state = (data && data.state) || 'done';
      const result = (data && data.result) || data;

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
    }, false);

    this.worker.addEventListener('error', (event) => {
      this.promise.reject([event], this);
    });

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
  }

  execute(input) {
    return this.worker.postMessage({
      type:  'execute',
      input: input
    });
  }

  terminate() {
    return this.worker.terminate();
  }
}
