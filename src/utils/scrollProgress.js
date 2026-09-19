// Module-level scroll state shared between React DOM and R3F render loop.
// Using a plain variable (not React state) for zero-overhead reads inside useFrame.

let _progress = 0

export function setScrollProgress(v) {
  _progress = v
}

export function getScrollProgress() {
  return _progress
}
