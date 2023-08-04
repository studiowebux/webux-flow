module.exports = (globalContext) => (input) => {
  // console.debug(globalContext, input);
  const randomNumber = Math.random() + 100;
  const obj = {
    foo: "bar",
    rnd: randomNumber,
    help: globalContext["help"],
    bonjour: input.helloWorld,
    message: input.message,
  };

  return Promise.resolve(obj);
};
