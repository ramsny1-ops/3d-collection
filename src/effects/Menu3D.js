/** 3D menu where focused or hovered items advance toward the viewer. */
export class Menu3D {
  constructor(element, { depth = 70, rotate = 8 } = {}) {
    this.element = element;
    this.depth = depth;
    this.rotate = rotate;
    this.items = [...element.querySelectorAll('[data-menu-item]')];
    this.handlers = [];
    this.items.forEach((item, index) => {
      const enter = () => this.activate(index);
      item.addEventListener('pointerenter', enter);
      item.addEventListener('focus', enter);
      this.handlers.push([item, enter]);
    });
    this.activate(0);
  }
  activate(index) {
    this.items.forEach((item, i) => {
      const delta = i - index;
      item.style.transform = `translateZ(${i === index ? this.depth ?? 70 : 0}px) translateY(${delta * 2}px) rotateX(${delta * (this.rotate ?? 8)}deg)`;
      item.toggleAttribute('data-active', i === index);
    });
  }
  destroy() { for (const [item, fn] of this.handlers) { item.removeEventListener('pointerenter', fn); item.removeEventListener('focus', fn); item.style.transform = ''; } }
}
