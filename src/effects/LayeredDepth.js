import { PointerTracker } from '../core/PointerTracker.js';

/** Moves child layers at different translateZ and pointer offsets. */
export class LayeredDepth {
  constructor(element, { selector = '[data-depth]', travel = 26, smoothing = 0.12 } = {}) {
    this.element = element;
    this.layers = [...element.querySelectorAll(selector)];
    this.tracker = new PointerTracker(element, { smoothing });
    this.unsubscribe = this.tracker.subscribe(({ x, y }) => {
      for (const layer of this.layers) {
        const depth = Number(layer.dataset.depth ?? 1);
        const px = x * travel * depth;
        const py = y * travel * depth;
        const z = depth * 38;
        layer.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, ${z.toFixed(2)}px)`;
      }
    });
  }
  destroy() { this.unsubscribe?.(); this.tracker.destroy(); for (const layer of this.layers) layer.style.transform = ''; }
}
