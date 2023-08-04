const { Color } = require("../src/libs/Colors");

module.exports = {
  name: "hello__world",
  metadata: {
    createdAt: "2023-08-02",
    updatedAt: "2023-08-02",
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
    test_condition_and_one_false: {
      type: "condition",
      operator: "and",
      conditions: [
        {
          left: "{directoryOutput}",
          right: "/Users/tgingras/Documents/Projects",
          operator: "eq",
        },
      ],
      output: "andOneFalseleftAndRightOutput",
    },
    test_condition_and_two_true: {
      type: "condition",
      operator: "and",
      conditions: [
        {
          left: "Bonjour",
          right: "Bonjour",
          operator: "eq",
        },
        {
          left: "Hello",
          right: "Hello",
          operator: "eq",
        },
      ],
      output: "andTwoTrueleftAndRightOutput",
    },
    print_will_wait: {
      type: "print",
      level: "info",
      input: "Will wait for 2s with variable '{help}'",
    },
    wait_for_2000: {
      type: "wait",
      duration: 2000,
    },
    print_waited_2000: {
      type: "print",
      level: "info",
      input: ["Hello", "World", "Bonjour", "Monde", "!"],
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
          input: ["index"],
        },
      },
    },
    parallel_processing: {
      type: "parallel",
      states: {
        print_process_1: {
          type: "print",
          input: ["Process 1"],
        },
        print_process_2: {
          type: "print",
          input: ["Process 2"],
        },
      },
    },
    function_foo_bar: {
      type: "function",
      handler: require("./functions/foobar"),
      errorHandler: require("./functions/errorHandler"),
      retries: 2,
      async: true,
      input: { message: "{message}", helloWorld: "Hello World" },
      output: "function__foo__bar",
    },

    function_sync: {
      type: "function",
      handler: require("./functions/true"),
      output: "function__sync",
    },

    parallel_processing_functions: {
      type: "parallel",
      states: {
        function_process_async: {
          type: "function",
          handler: require("./functions/processAsync"),
          errorHandler: require("./functions/errorHandler"),
          retries: 5,
          output: "function__throw__async",
          async: true,
        },
        function_throw_async: {
          type: "function",
          handler: require("./functions/throw"),
          errorHandler: require("./functions/errorHandler"),
          retries: 5,
          output: "function__throw__async",
          async: true,
        },
      },
    },

    function_throw_default: {
      type: "function",
      handler: require("./functions/throwDefault"),
    },

    function_throw: {
      type: "function",
      handler: require("./functions/throw"),
      errorHandler: require("./functions/errorHandler"),
      retries: 5,
      output: "function__throw",
    },
  },
};
