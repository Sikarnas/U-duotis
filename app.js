const fs = require("fs");
const calculateCommissions = require("./utils/calculateCommissions");
const getFees = require("./utils/getFees");

const fileName = process.argv[2];
const operations = JSON.parse(fs.readFileSync(fileName));

getFees().then(commissions => {
  calculateCommissions(operations, commissions, calculatedFee =>
    console.log(calculatedFee)
  ).catch(e => console.log("Error:", e));
});
