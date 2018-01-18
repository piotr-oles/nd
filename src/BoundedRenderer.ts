import { Canvas } from './Canvas';
import { Camera } from './primitive/Camera';
import { Scene } from './primitive/Scene';
import { Renderer } from './Renderer';

export namespace BoundedRenderer {
  export type Options = Renderer.Options & {
    persist?: boolean;
  }
}

export class BoundedRenderer extends Renderer {
  private persist: boolean;

  constructor(
    private scene: Scene,
    private camera: Camera,
    options?: BoundedRenderer.Options,
    private canvas?: Canvas
  ) {
    super(options);
    this.persist = options.persist;
  }

  bindCanvas(canvas: Canvas) {
    this.canvas = canvas;
  }

  render()  {
    return super.render(this.scene, this.camera, this.canvas, this.persist);
  }
}
