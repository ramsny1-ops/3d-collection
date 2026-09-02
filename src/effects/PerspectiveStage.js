/** Adds perspective and preserve-3d behavior to a stage. */
export class PerspectiveStage {
  constructor(element, { perspective = 1000, origin = '50% 50%' } = {}) {
    this.element = element;
    this.previous = {
      perspective: element.style.perspective,
      perspectiveOrigin: element.style.perspectiveOrigin,
      transformStyle: element.style.transformStyle
    };
    element.style.perspective = `${perspective}px`;
    element.style.perspectiveOrigin = origin;
    element.style.transformStyle = 'preserve-3d';
  }

  destroy() {
    Object.assign(this.element.style, this.previous);
  }
}
