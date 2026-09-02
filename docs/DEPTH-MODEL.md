# Depth Model

CSS 3D creates a projected scene from transformed DOM layers.

The key concepts are:

- perspective: distance between the viewer and projection plane
- rotateX and rotateY: orientation in 3D space
- translateZ: distance toward or away from the viewer
- transform-origin: pivot or hinge location
- transform-style: whether descendants retain independent 3D positions
- backface-visibility: whether the reverse side of a rotated surface is rendered

## Depth should have meaning

A larger Z value can represent higher priority, an active state, a foreground control, or an object physically nearer the viewer.

Avoid arbitrary depth because inconsistent spatial rules make interfaces harder to understand.

## Text readability

Text should usually remain close to front-facing. Extreme perspective is better for decorative surfaces than reading surfaces.
