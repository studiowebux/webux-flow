module.exports = (globalContext) => (input) => {
  console.log("This function is synced but throws directly");
  throw new Error("throw Default");
};
