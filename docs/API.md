# API Reference

## PerspectiveStage

`new PerspectiveStage(element, options)`

Options:

- `perspective`: camera distance in pixels. Default `1000`.
- `origin`: CSS perspective origin. Default `50% 50%`.

Methods:

- `destroy()` restores previous inline styles.

## TiltCard

`new TiltCard(element, options)`

Options:

- `maxTilt`: maximum rotation in degrees.
- `lift`: translateZ distance.
- `shadow`: depth-shadow size.
- `smoothing`: pointer interpolation factor from `0.01` to `1`.

Methods:

- `destroy()`

## LayeredDepth

`new LayeredDepth(element, options)`

Options:

- `selector`: child selector. Default `[data-depth]`.
- `travel`: maximum pointer travel multiplier.
- `smoothing`: pointer smoothing.

Each child reads a numeric `data-depth` value.

## Menu3D

`new Menu3D(element, { depth, rotate })`

Items use `data-menu-item`.

Methods:

- `activate(index)`
- `destroy()`

## Cube3D

Methods:

- `rotateBy(x, y)`
- `set(x, y)`
- `render()`

## FoldPanel

Options:

- `axis`: `x` or `y`.
- `angle`: initial angle.

Methods:

- `set(angle)`
- `toggle()`

## PageTurn

Options:

- `pageSelector`: default `[data-page]`.

Methods:

- `next()`
- `prev()`
- `render()`

## ParallaxPlanes

Children use `data-plane` values.

Options:

- `travel`
- `smoothing`

## Gallery3D

Options:

- `itemSelector`
- `spacing`
- `depth`
- `rotate`

Methods:

- `go(index)`
- `next()`
- `prev()`

## SpatialNavigation

`new SpatialNavigation(container, { selector })`

Default selector is `[data-spatial]`.

Arrow keys choose the nearest candidate in the requested visual direction.

## WebGLScene

`new WebGLScene(canvas)`

Methods:

- `start()`
- `stop()`
- `resize()`

Throws when WebGL is unavailable.
