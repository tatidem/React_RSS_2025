const DELAY = 200;

export function callWithDelay(callback: () => void) {
  setTimeout(() => callback(), DELAY);
}
