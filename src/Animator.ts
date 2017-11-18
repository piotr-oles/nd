// shim layer
import { Renderer } from './Renderer';
import { Canvas } from './Canvas';
import { Camera } from './Primitive/Camera';
import { Scene } from './Primitive/Scene';

const requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  (window as any).msRequestAnimationFrame ||
  ((callback) => window.setTimeout(callback, 14)) // 14 ~ 1000 / 60 + 10
);

const cancelAnimationFrame = (
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  (window as any).mozCancelAnimationFrame ||
  (window as any).msCancelAnimationFrame ||
  ((id) => window.clearTimeout(id))
);

export type AnimationProcedure = () => void;

export class Animator {
  private index: number = 0;
  private requestId: number = null;

  constructor(
    private canvas: Canvas,
    private renderer: Renderer,
    private scene: Scene,
    private camera: Camera,
    private procedure: AnimationProcedure
  ) {}

  start() {
    this.tick();
  }

  stop() {
    if (null !== this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  tick = () => {
    this.requestId = requestAnimationFrame(this.tick);

    this.procedure();
  };

  frame(persist: boolean) {
    this.renderer.render(this.scene, this.camera, this.canvas, persist);
    ++this.index;
  }
}
