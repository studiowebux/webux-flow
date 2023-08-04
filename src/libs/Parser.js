const { extractInputs } = require("./Inputs");

function parseInput(context, input) {
  let parsedInput = {};
  if (!input) return parsedInput;
  Object.entries(input).forEach(([key, value]) => {
    const v = extractInputs({ context, input: Object.keys(context) }, value);
    parsedInput = {
      ...parsedInput,
      [key]: v !== undefined ? v : value,
    };
  });

  return parsedInput;
}

module.exports = { parseInput };
