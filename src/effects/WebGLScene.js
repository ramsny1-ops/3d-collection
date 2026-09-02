/** Minimal optional WebGL rotating object. No external libraries. */
export class WebGLScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!this.gl) throw new Error('WebGL is unavailable in this browser.');
    this.running = false;
    this.angle = 0;
    this.setup();
  }

  setup() {
    const gl = this.gl;
    const vs = `attribute vec2 a; uniform float u; void main(){ float c=cos(u),s=sin(u); vec2 p=vec2(a.x*c-a.y*s,a.x*s+a.y*c); gl_Position=vec4(p,0.,1.); }`;
    const fs = `precision mediump float; uniform float u; void main(){ gl_FragColor=vec4(.35+.25*sin(u),.55,.95,.92); }`;
    const shader = (type, source) => { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); return s; };
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,.68,-.62,-.42,.62,-.42]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.program = program;
    this.u = gl.getUniformLocation(program, 'u');
    this.resize();
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; }
    this.gl.viewport(0,0,w,h);
  }

  start() { if (this.running) return; this.running = true; this.raf = requestAnimationFrame(this.tick); }
  stop() { this.running = false; cancelAnimationFrame(this.raf); }
  tick = time => { if (!this.running) return; this.resize(); this.angle = time * 0.001; this.gl.clearColor(0,0,0,0); this.gl.clear(this.gl.COLOR_BUFFER_BIT); this.gl.uniform1f(this.u, this.angle); this.gl.drawArrays(this.gl.TRIANGLES, 0, 3); this.raf = requestAnimationFrame(this.tick); };
}
