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
    async_two: {
      type: "parallel",
      states: {
        print_count: {
          type: "print",
          input: ["I'm a teapot", "#", "using async mode"],
          output: "print_count_index",
        },
        waitfor: {
          type: "wait",
          duration: 5000,
        },
        print_count_line: {
          type: "print",
          input: `I'm a teapot: using async mode`,
          output: "print_count_line_index",
        },
      },
    },
    then: {
      type: "print",
      input: "Then it is done :)",
    },
  },
};
