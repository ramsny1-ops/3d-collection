import { clamp, lerp } from './math.js';
import { frameLoop } from './FrameLoop.js';

/** Tracks pointer position relative to an element and exposes smoothed -1..1 coordinates. */
export class PointerTracker {
  constructor(element, { smoothing = 0.14 } = {}) {
    this.element = element;
    this.smoothing = clamp(smoothing, 0.01, 1);
    this.targetX = 0;
    this.targetY = 0;
    this.x = 0;
    this.y = 0;
    this.active = false;
    this.subscribers = new Set();

    this.onMove = this.onMove.bind(this);
    this.onLeave = this.onLeave.bind(this);
    element.addEventListener('pointermove', this.onMove);
    element.addEventListener('pointerleave', this.onLeave);
  }

  onMove(event) {
    const r = this.element.getBoundingClientRect();
    this.targetX = clamp(((event.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    this.targetY = clamp(((event.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    this.start();
  }

  onLeave() {
    this.targetX = 0;
    this.targetY = 0;
    this.start();
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.stopLoop = frameLoop.add(() => {
      this.x = lerp(this.x, this.targetX, this.smoothing);
      this.y = lerp(this.y, this.targetY, this.smoothing);
      for (const fn of this.subscribers) fn({ x: this.x, y: this.y });
      if (Math.abs(this.x - this.targetX) < 0.001 && Math.abs(this.y - this.targetY) < 0.001) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.active = false;
        this.stopLoop?.();
      }
    });
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    fn({ x: this.x, y: this.y });
    return () => this.subscribers.delete(fn);
  }

  destroy() {
    this.stopLoop?.();
    this.element.removeEventListener('pointermove', this.onMove);
    this.element.removeEventListener('pointerleave', this.onLeave);
    this.subscribers.clear();
  }
}
