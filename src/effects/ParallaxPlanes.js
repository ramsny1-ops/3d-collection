import { PointerTracker } from '../core/PointerTracker.js';

/** Perspective planes that drift according to their data-plane depth. */
export class ParallaxPlanes {
  constructor(element, { travel = 36, smoothing = 0.1 } = {}) {
    this.element = element;
    this.planes = [...element.querySelectorAll('[data-plane]')];
    this.tracker = new PointerTracker(element, { smoothing });
    this.unsubscribe = this.tracker.subscribe(({ x, y }) => {
      for (const plane of this.planes) {
        const depth = Number(plane.dataset.plane || 1);
        plane.style.transform = `translate3d(${(-x * travel * depth).toFixed(2)}px, ${(-y * travel * depth).toFixed(2)}px, ${(depth * 90).toFixed(2)}px) rotateY(${(x * depth * 2).toFixed(2)}deg)`;
      }
    });
  }
  destroy() { this.unsubscribe?.(); this.tracker.destroy(); }
}
