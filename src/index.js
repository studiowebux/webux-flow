const main = require("./main");

// Load Program
const floppy = require("../programs/test_3");

(async () => {
  await main(floppy);
})();
