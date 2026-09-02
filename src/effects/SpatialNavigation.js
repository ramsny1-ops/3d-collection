/** Arrow-key spatial navigation for focusable 2D or 3D UI layouts. */
export class SpatialNavigation {
  constructor(container, { selector = '[data-spatial]' } = {}) {
    this.container = container;
    this.selector = selector;
    this.onKey = this.onKey.bind(this);
    container.addEventListener('keydown', this.onKey);
  }

  onKey(event) {
    const directions = { ArrowLeft: [-1,0], ArrowRight: [1,0], ArrowUp: [0,-1], ArrowDown: [0,1] };
    const dir = directions[event.key];
    if (!dir) return;
    const items = [...this.container.querySelectorAll(this.selector)];
    const current = document.activeElement;
    if (!items.includes(current)) return;
    const a = current.getBoundingClientRect();
    const ax = a.left + a.width / 2;
    const ay = a.top + a.height / 2;
    let best = null;
    let bestScore = Infinity;
    for (const item of items) {
      if (item === current) continue;
      const b = item.getBoundingClientRect();
      const dx = b.left + b.width / 2 - ax;
      const dy = b.top + b.height / 2 - ay;
      if ((dir[0] < 0 && dx >= 0) || (dir[0] > 0 && dx <= 0) || (dir[1] < 0 && dy >= 0) || (dir[1] > 0 && dy <= 0)) continue;
      const primary = Math.abs(dir[0] ? dx : dy);
      const secondary = Math.abs(dir[0] ? dy : dx);
      const score = primary + secondary * 1.8;
      if (score < bestScore) { bestScore = score; best = item; }
    }
    if (best) { event.preventDefault(); best.focus(); }
  }

  destroy() { this.container.removeEventListener('keydown', this.onKey); }
}
