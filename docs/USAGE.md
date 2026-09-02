# Usage Guide

## 1. Establish perspective

Perspective belongs on an ancestor, not usually on the object being rotated.

```css
.stage {
  perspective: 900px;
}
```

A smaller value produces stronger perspective distortion. A larger value creates a flatter camera.

## 2. Preserve child depth

Nested layers need:

```css
.scene {
  transform-style: preserve-3d;
}
```

Without it, browsers flatten descendants into the parent's plane.

## 3. Place objects in Z

```css
.background { transform: translateZ(-80px); }
.content { transform: translateZ(30px); }
.foreground { transform: translateZ(100px); }
```

## 4. Choose a transform origin

Folding and page-turn effects depend on hinge placement.

```css
.panel {
  transform-origin: left center;
}
```

## 5. Keep interaction semantic

Use real buttons and links. Apply 3D transforms to them or their wrappers rather than replacing them with canvas-only controls.

## 6. Build depth shadows

A useful depth shadow usually moves in the opposite direction from the surface tilt. `TiltCard` derives this automatically.

## 7. Use WebGL selectively

The included WebGL module intentionally stays small. For production shader work, WebGL or WebGPU can be added as an optional rendering layer while normal interface content stays in the DOM.
