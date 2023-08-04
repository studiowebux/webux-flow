const { execSync } = require("node:child_process");
const { extractInputs } = require("./Inputs");
const { OPERATORS } = require("./Conditions");
const { waitFor } = require("./Timer");
const { parseInput } = require("./Parser");
require("./Strings");

module.exports = async function runner(context, states, state, id) {
  let output;

  switch (states[state].type) {
    case "print":
      output = [];
      if (Array.isArray(states[state].input)) {
        for (const input of states[state].input) {
          if (Array.isArray(context[input])) {
            output.push(
              `${context[input]
                .map((line) => `${states[state].prefix || ""}${line}`)
                .join(states[state].separator || "\n")}`
            );
          } else {
            output.push(
              `${states[state].prefix || ""}${
                context[input] !== undefined ? context[input] : input
              }`
            );
          }
        }
      } else {
        output.push(
          `${states[state].prefix || ""}${extractInputs(
            { context, input: Object.keys(context) },
            states[state].input
          )}`
        );
      }

      console[state.level || "log"](
        `${output.join(states[state].separator || " ")}`
      );

      break;

    case "command":
      let cmd = states[state].command;
      cmd = cmd.replaceAll('"', '\\"');
      if (states[state].input) {
        cmd = extractInputs({ context, input: states[state].input }, cmd);
      }

      output = execSync(cmd, {
        shell: states[state].shell,
        uid: states[state].uid,
        gid: states[state].gid,
        cwd: states[state].cwd,
      })
        .toString("utf-8")
        .trim()
        .noColor()
        .toArray();

      break;

    case "condition":
      const operator = states[state].operator;
      const conditions = states[state].conditions;
      let parsedConditions = [];

      conditions.forEach((condition) => {
        parsedConditions.push({
          left: extractInputs(
            { context, input: Object.keys(context) },
            condition.left
          ),
          right: extractInputs(
            { context, input: Object.keys(context) },
            condition.right
          ),
          operator: condition.operator,
        });
      });

      output = OPERATORS[operator](parsedConditions);

      break;

    case "wait":
      const duration = parseInt(states[state].duration);
      await waitFor(duration);
      break;

    case "loop":
      const iterator = states[state].iterator;
      for (let i = iterator.index; i < iterator.count; i += iterator.step) {
        iterator.index = i;
        const localStates = states[state].states;
        for (const localState in localStates) {
          const result = await runner(
            { ...context, ...iterator },
            localStates,
            localState,
            id
          );

          if (localStates[localState].output)
            context[`${localStates[localState].output}_${i}`] = result.output;
        }
      }
      break;

    case "parallel":
      output = await Promise.all(
        Object.keys(states[state].states).map((key) => {
          return new Promise(async (resolve) => {
            const localOutput = await runner(
              context,
              states[state].states,
              key,
              id++
            );
            resolve(localOutput);
          });
        })
      );
      break;

    case "function":
      const retries = parseInt(states[state].retries) || 1;
      const errorHandler =
        states[state].errorHandler ||
        function (e) {
          throw e;
        };
      const handler = states[state].handler;
      const isAsync = states[state].async === true;
      let attempt = 0;

      //   Define Function
      const fn = () => {
        let localOutput;
        try {
          attempt += 1;
          localOutput = handler(context)(
            parseInput(context, states[state].input)
          );
          return localOutput;
        } catch (e) {
          errorHandler(e);
          if (attempt < retries) {
            console.log(`An error occured, will retry (${attempt}/${retries})`);
            output = fn();
          } else {
            console.log(
              `An error occured, retries exhausted (${attempt}/${retries})`
            );
            throw e;
          }
        }
      };

      //   Launch FN
      if (isAsync) {
        output = await fn();
      } else {
        output = fn();
      }

      break;
  }

  //   Assign Output

  if (states[state].output) context[states[state].output] = output;

  return { context, output };
};
