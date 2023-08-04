function waitFor(duration) {
  return new Promise((resolve) => setTimeout(() => resolve(), duration));
}

module.exports = {
  waitFor,
};
