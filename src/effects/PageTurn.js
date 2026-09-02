/** Page-turn controller for book-like DOM pages. */
export class PageTurn {
  constructor(element, { pageSelector = '[data-page]' } = {}) {
    this.element = element;
    this.pages = [...element.querySelectorAll(pageSelector)];
    this.index = 0;
    this.render();
  }
  next() { this.index = Math.min(this.pages.length, this.index + 1); this.render(); }
  prev() { this.index = Math.max(0, this.index - 1); this.render(); }
  render() {
    this.pages.forEach((page, i) => {
      const turned = i < this.index;
      page.style.zIndex = String(turned ? i : this.pages.length - i);
      page.style.transform = turned ? 'rotateY(-178deg)' : 'rotateY(0deg)';
      page.toggleAttribute('data-turned', turned);
    });
  }
}
