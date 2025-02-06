const DELAY = 400;

export function callWithDelay(callback: () => void) {
  setTimeout(() => callback(), DELAY);
}
