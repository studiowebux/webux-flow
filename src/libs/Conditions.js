const OPERATORS = {
  or: (conditions) =>
    conditions.some((c) => applyCondition(c.left, c.right, c.operator)),
  and: (conditions) =>
    conditions.every((c) => applyCondition(c.left, c.right, c.operator)),
  //   ["plus", "+"],
  //   ["minus", "-"],
  //   ["times", "*"],
  //   ["divided", "/"],
  //   ["greater than", ">"],
  //   ["greater than or equal", ">="],
  //   ["less than or equal", "<="],
  //   ["less than", "<"],
  //   ["equals", "=="],
};

function applyCondition(left, right, operator) {
  if (operator === "gt" || operator === ">") return left > right;
  if (operator === "lt" || operator === "<") return left < right;
  if (operator === "lte" || operator === "<=") return left <= right;
  if (operator === "gte" || operator === ">=") return left >= right;
  if (operator === "neq" || operator === "!==") return left !== right;
  if (operator === "eq" || operator === "==" || operator === "===")
    return left === right;

  throw new Error(`Invalid Operator: ${operator}`);
}

module.exports = {
  OPERATORS,
};
