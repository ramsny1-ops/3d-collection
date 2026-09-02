# Performance

## Prefer compositor-friendly motion

Use transforms and opacity for animation. Browsers can often composite these without repeating document layout.

## Limit layer count

Every promoted or heavily filtered layer can consume GPU memory. Deep visual trees should be used intentionally.

## Shared pointer scheduling

`PointerTracker` uses the shared `FrameLoop`. Multiple tilt or parallax components can therefore animate through a common requestAnimationFrame source.

## Stop when settled

The pointer tracker removes itself from the frame scheduler after it reaches its target.

## Avoid permanent 60 FPS work

Static 3D scenes require no animation loop. Only continuously changing scenes should consume per-frame CPU time.

## WebGL

Resize the drawing buffer according to display size, but cap device-pixel ratio for expensive scenes. The included demo caps practical complexity by rendering only one triangle.
