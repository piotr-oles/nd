
export class Canvas {
  public readonly shaders = {
    program:  null,
    vertex:   null,
    fragment: null
  };

  private devicePixelRatio: number;
  private context: WebGLRenderingContext;

  constructor(
    private element: HTMLCanvasElement,
    private width: number,
    private height: number
  ) {
    this.devicePixelRatio = window.devicePixelRatio || 1;

    this.setSize(
        width  || this.element.width,
        height || this.element.height
    );

    this.initContext({
        preserveDrawingBuffer: true
    });

    this.configureContext();
  }
    
  setElement(element: HTMLCanvasElement) {
    this.element = element;
    this.setSize(element.width, element.height);

    this.initContext({
        preserveDrawingBuffer: true
    });

    this.configureContext();
  }
        
  setSize(width: number, height: number) {
    const deviceWidth  = width  * this.devicePixelRatio;
    const deviceHeight = height * this.devicePixelRatio;

    this.element.width  = deviceWidth;
    this.element.height = deviceHeight;

    this.element.style.width  = width  + 'px';
    this.element.style.height = height + 'px';

    this.width  = deviceWidth;
    this.height = deviceHeight;

    return this;
  }

  initContext(options = {}) {
    this.context = this.element.getContext('webgl',              options) ||
                   this.element.getContext('experimental-webgl', options);

    if (!this.context) {
      throw new Error('WebGL is not supported by this browser.');
    }
  }

  configureContext() {
    this.context.viewport(0, 0, this.width, this.height);
    this.context.clearColor(0.0, 0.0, 0.0, 0.0);
  }

  getContext() {
    return this.context;
  }
}