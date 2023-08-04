function extractInputs({ context, input }, str) {
  input.forEach((input) => {
    str = str.replace(new RegExp(`{${input}}`, "g"), context[input].toString());
  });

  return str;
}

module.exports = {
  extractInputs,
};
