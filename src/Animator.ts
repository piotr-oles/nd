// shim layer
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

export type Tick = () => void;

export class Animator {
  private tickIndex: number = 0;
  private tickRequestId: number = null;

  constructor(
    private tick: Tick
  ) {}

  start() {
    this.nextTick();
  }

  stop() {
    if (null !== this.tickRequestId) {
      cancelAnimationFrame(this.tickRequestId);
      this.tickRequestId = null;
    }
  }

  nextTick = () => {
    this.tickRequestId = requestAnimationFrame(this.nextTick);

    this.tick();
    ++this.tickIndex;
  };
}
