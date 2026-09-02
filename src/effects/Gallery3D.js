import { clamp } from '../core/math.js';

/** Perspective carousel-style gallery controlled by buttons, wheel, or API. */
export class Gallery3D {
  constructor(element, { itemSelector = '[data-gallery-item]', spacing = 220, depth = 130, rotate = 48 } = {}) {
    this.element = element;
    this.items = [...element.querySelectorAll(itemSelector)];
    this.spacing = spacing;
    this.depth = depth;
    this.rotate = rotate;
    this.index = 0;
    this.render();
  }
  go(index) { this.index = clamp(index, 0, Math.max(0, this.items.length - 1)); this.render(); }
  next() { this.go(this.index + 1); }
  prev() { this.go(this.index - 1); }
  render() {
    this.items.forEach((item, i) => {
      const d = i - this.index;
      const z = -Math.abs(d) * this.depth;
      const x = d * this.spacing;
      const ry = d === 0 ? 0 : -Math.sign(d) * this.rotate;
      item.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${ry}deg)`;
      item.style.opacity = String(Math.max(0.22, 1 - Math.abs(d) * 0.22));
      item.toggleAttribute('data-active', d === 0);
    });
  }
}
