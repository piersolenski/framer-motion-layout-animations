export const conditionalEnterExit = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: (val) => ({ opacity: val ? 0 : 1 }),
};

export const transition = {
  duration: 1,
};
