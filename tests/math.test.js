import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, lerp, invLerp, mapRange } from '../src/core/math.js';

test('clamp limits values', () => {
  assert.equal(clamp(2), 1);
  assert.equal(clamp(-1), 0);
  assert.equal(clamp(.4), .4);
});

test('lerp interpolates', () => {
  assert.equal(lerp(0, 100, .25), 25);
});

test('invLerp normalizes', () => {
  assert.equal(invLerp(10, 20, 15), .5);
});

test('mapRange maps ranges', () => {
  assert.equal(mapRange(5, 0, 10, 0, 100), 50);
});
