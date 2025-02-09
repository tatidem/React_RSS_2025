const DELAY = 100;

export function callWithDelay(callback: () => void) {
  setTimeout(() => callback(), DELAY);
}
