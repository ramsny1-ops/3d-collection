import { PointerTracker } from '../core/PointerTracker.js';

/** Pointer-reactive card tilt with configurable depth shadow. */
export class TiltCard {
  constructor(element, { maxTilt = 14, lift = 18, shadow = 42, smoothing = 0.16 } = {}) {
    this.element = element;
    this.previous = { transform: element.style.transform, boxShadow: element.style.boxShadow, transformStyle: element.style.transformStyle };
    element.style.transformStyle = 'preserve-3d';
    this.tracker = new PointerTracker(element, { smoothing });
    this.unsubscribe = this.tracker.subscribe(({ x, y }) => {
      const rx = -y * maxTilt;
      const ry = x * maxTilt;
      const sx = -x * shadow * 0.35;
      const sy = -y * shadow * 0.35 + 18;
      const blur = shadow;
      element.style.transform = `translateZ(${lift}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      element.style.boxShadow = `${sx.toFixed(1)}px ${sy.toFixed(1)}px ${blur}px rgba(0,0,0,.28)`;
    });
  }
  destroy() {
    this.unsubscribe?.();
    this.tracker.destroy();
    Object.assign(this.element.style, this.previous);
  }
}
