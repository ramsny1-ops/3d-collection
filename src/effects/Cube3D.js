/** Keyboard and button controllable CSS 3D cube. */
export class Cube3D {
  constructor(element) {
    this.element = element;
    this.rx = -18;
    this.ry = 28;
    this.render();
  }
  rotateBy(x = 0, y = 0) { this.rx += x; this.ry += y; this.render(); }
  set(x, y) { this.rx = x; this.ry = y; this.render(); }
  render() { this.element.style.transform = `rotateX(${this.rx}deg) rotateY(${this.ry}deg)`; }
}
