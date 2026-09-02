/** Shared requestAnimationFrame scheduler used by pointer-reactive effects. */
export class FrameLoop {
  #tasks = new Set();
  #raf = 0;
  #last = 0;

  add(task) {
    this.#tasks.add(task);
    if (!this.#raf) this.#raf = requestAnimationFrame(this.#tick);
    return () => this.remove(task);
  }

  remove(task) {
    this.#tasks.delete(task);
    if (!this.#tasks.size && this.#raf) {
      cancelAnimationFrame(this.#raf);
      this.#raf = 0;
      this.#last = 0;
    }
  }

  #tick = time => {
    const dt = this.#last ? Math.min((time - this.#last) / 1000, 0.05) : 0;
    this.#last = time;
    for (const task of [...this.#tasks]) task(dt, time);
    this.#raf = this.#tasks.size ? requestAnimationFrame(this.#tick) : 0;
  };
}

export const frameLoop = new FrameLoop();
