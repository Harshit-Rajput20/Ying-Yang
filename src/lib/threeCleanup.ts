// src/lib/threeCleanup.ts
let cleanupCallback: (() => void) | null = null;

export const registerThreeCleanup = (callback: () => void) => {
  cleanupCallback = callback;
};

export const runThreeCleanup = () => {
  if (cleanupCallback) {
    cleanupCallback();
    cleanupCallback = null;
  }
};
