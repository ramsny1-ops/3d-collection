/** Hinged panel that folds around one edge. */
export class FoldPanel {
  constructor(element, { axis = 'y', angle = 0 } = {}) {
    this.element = element;
    this.axis = axis;
    this.angle = angle;
    this.render();
  }
  set(angle) { this.angle = angle; this.render(); }
  toggle() { this.set(this.angle === 0 ? -155 : 0); }
  render() { this.element.style.transform = `${this.axis === 'x' ? 'rotateX' : 'rotateY'}(${this.angle}deg)`; }
}
