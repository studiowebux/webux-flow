const runner = require("./libs/Runner");

// Step 0: Init environment
let snapshots = [];
let id;

const main = async (floppy, pid) => {
  if (!pid) {
    id = 1;
  }

  // Step 1: Load Program
  const states = floppy.states || [];

  // Step 2: Load initial State to Outputs
  let context = floppy.initialState || {};

  try {
    for (const state in states) {
      // Step 3: Execute State
      const result = await runner(context, states, state, id);
      context = { ...context, ...result.context };

      // Step 4: Save Current State in Snapshot
      snapshots.push({
        timestamp: new Date().getTime(),
        ...context,
      });

      // Step 5: Next
      //   ...
    }
  } catch (e) {
    throw e;
  } finally {
    if (id === 1)
      console.debug("Final Snapshot:", snapshots[snapshots.length - 1]);
      // console.debug("Snapshots:", snapshots);
  }
};

module.exports = main;
