const background = {
  initial: {
    // x: 800,
    x: 240,
    opacity: 1,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: 240,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const backgroundMenu = {
  initial: {
    x: 800,
    opacity: 1,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: 800,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const backgroundContent = {
  initial: {
    // x: 800,
    x: 200,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: 200,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export { background, backgroundContent, backgroundMenu };