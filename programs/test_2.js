const { Color } = require("../src/libs/Colors");

module.exports = {
  name: "hello__world",
  metadata: {
    createdAt: "2023-08-03",
    updatedAt: "2023-08-03",
    version: "0.0.0",
  },
  initialState: {
    message: "MSG: Hello World !",
    help: "MSG: HELP SOS",
    startsWith: "' @[a-zA-Z]'",
  },
  states: {
    print_hello_world: {
      type: "print",
      level: "debug",
      separator: "\n",
      prefix: `${Color("ℹ︎", "FgBlue")} `,
      input: ["message", "help"],
    },
    print_help_only: {
      type: "print",
      level: "info",
      prefix: `${Color("★", "FgYellow")} `,
      input: ["help"],
    },
    bash_list_directory: {
      type: "command",
      shell: "/bin/bash",
      command: "ls -alh | grep -E {startsWith}",
      input: ["startsWith"],
      output: "directoryOutput",
      cwd: "/Users/tgingras/Documents/Projects",
    },
    bash_pwd: {
      type: "command",
      shell: "/bin/bash",
      command: "pwd",
      output: "currentWorkingDirectory",
    },
    print_directory_list: {
      type: "print",
      level: "info",
      prefix: "# ",
      separator: "\n",
      input: ["directoryOutput"],
    },
    test_condition_or_one_false: {
      type: "condition",
      operator: "or",
      conditions: [
        {
          left: "{directoryOutput}",
          right: "/Users/tgingras/Documents/Projects",
          operator: "eq",
        },
      ],
      output: "orOneFalseleftAndRightOutput",
    },
    for_loop_one: {
      type: "loop",
      iterator: {
        count: 5,
        index: 0,
        step: 1,
      },
      states: {
        print_count: {
          type: "print",
          input: ["I'm a teapot", "#", "index"],
          output: "print_count_index",
        },
        print_count_line: {
          type: "print",
          input: `I'm a teapot: #{index}`,
          output: "print_count_line_index",
        },
      },
    },
  },
};
