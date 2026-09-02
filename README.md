# Depth 3D UI Collection

A dependency-free ES2023 collection for interfaces that visually behave like physical objects.

The project focuses on DOM-first 3D UI. CSS transforms and perspective handle semantic interface surfaces. JavaScript supplies pointer tracking, state, keyboard navigation, and reusable controllers. A tiny raw WebGL example is included only to demonstrate when GPU rendering becomes useful.

## Included effects

1. Perspective tilt cards with dynamic depth shadows
2. Layered depth scenes with independent Z planes
3. Focus-aware 3D menus
4. Rotating CSS 3D cubes
5. Hinged folding panels
6. Book-like page-turn interfaces
7. Pointer-reactive parallax planes
8. Perspective galleries
9. Spatial keyboard navigation
10. Combined CSS 3D and optional WebGL scene

## Quick start

```bash
unzip depth-3d-ui-collection.zip
cd depth-3d-ui-collection
npm run serve
```

Open `http://localhost:8080/examples/`.

## Import

```js
import {
  PerspectiveStage,
  TiltCard,
  LayeredDepth,
  Gallery3D
} from './src/index.js';
```

## Perspective tilt

```html
<div class="stage">
  <article id="card">Physical UI</article>
</div>
```

```js
import { PerspectiveStage, TiltCard } from './src/index.js';

new PerspectiveStage(document.querySelector('.stage'), {
  perspective: 900
});

new TiltCard(document.querySelector('#card'), {
  maxTilt: 14,
  lift: 22,
  shadow: 48,
  smoothing: 0.16
});
```

## Layered depth

```html
<section id="scene">
  <div data-depth="0.25">Background</div>
  <div data-depth="0.8">Middle</div>
  <div data-depth="1.7">Foreground</div>
</section>
```

```js
import { LayeredDepth } from './src/index.js';

new LayeredDepth(document.querySelector('#scene'), {
  travel: 30
});
```

## Page turns

```html
<div id="book">
  <section data-page>Page one</section>
  <section data-page>Page two</section>
</div>
```

```js
import { PageTurn } from './src/index.js';

const book = new PageTurn(document.querySelector('#book'));

nextButton.addEventListener('click', () => book.next());
previousButton.addEventListener('click', () => book.prev());
```

## Perspective gallery

```js
import { Gallery3D } from './src/index.js';

const gallery = new Gallery3D(document.querySelector('#gallery'), {
  spacing: 220,
  depth: 130,
  rotate: 48
});

gallery.go(3);
```

## Spatial navigation

```js
import { SpatialNavigation } from './src/index.js';

new SpatialNavigation(document.querySelector('#navigation'), {
  selector: '[data-spatial]'
});
```

Arrow-key selection is based on element geometry. This makes it suitable for irregular dashboards, television-style interfaces, kiosk UIs, game menus, and spatial galleries.

## Architecture

The collection intentionally separates concerns.

`PerspectiveStage` configures the camera-like perspective context.

`PointerTracker` converts pointer position to normalized coordinates and smooths it through one shared animation-frame scheduler.

Visual controllers only manipulate transforms needed for their specific behavior.

`SpatialNavigation` is independent of visual motion and can be used without any 3D transforms.

`WebGLScene` is optional and does not affect the DOM-based features.

## Performance principles

Prefer `transform` and `opacity` for continuous motion. Avoid animating layout-heavy properties such as width, height, top, and left when the same effect can be achieved with transforms.

Do not apply `will-change` globally. Promote only elements that genuinely animate for meaningful periods.

Keep perspective scenes shallow. Hundreds of simultaneously composited layers can consume significant GPU memory even when JavaScript work is small.

Pointer-reactive effects use one shared frame scheduler instead of one permanent loop per component.

## Accessibility

3D is presentation, not information architecture. Keep important text and controls in semantic DOM elements.

Keyboard navigation should work independently from pointer motion.

Do not use extreme rotations that make text hard to read.

Respect reduced-motion preferences in production projects by disabling or reducing pointer-reactive motion when `prefers-reduced-motion: reduce` is active.

## CSS 3D versus WebGL

Use CSS 3D for cards, menus, pages, dashboards, forms, navigation, and content-rich UI. DOM semantics remain intact.

Use WebGL for large numbers of rendered objects, custom geometry, shaders, particle systems, physically based lighting, post-processing, and pixel-level distortion.

Do not move ordinary buttons or form controls into WebGL simply because a project uses 3D.

## Files

```text
depth-3d-ui-collection/
├── src/
│   ├── core/
│   ├── effects/
│   └── index.js
├── dist/
├── examples/
├── docs/
├── tests/
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

## Development

```bash
npm test
npm run check
npm run serve
```

## License

MIT.
