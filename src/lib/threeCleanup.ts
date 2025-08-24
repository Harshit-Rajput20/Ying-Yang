let cleanupCallback: (() => void) | null = null;

export const registerThreeCleanup = (callback: () => void) => {
  cleanupCallback = callback;
};

export const runThreeCleanup = () => {
  if (cleanupCallback) {
    try {
      cleanupCallback();
    } catch (err) {
      console.warn("Cleanup error:", err);
    }
    cleanupCallback = null;
  }
};





