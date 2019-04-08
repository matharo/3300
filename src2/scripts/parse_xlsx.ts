import * as fs from "fs";
const csv = require("csvtojson");
const filename = "/market_data.csv";

const buildDir = "./build/data";
const devDir = "./src/data"

csv()
  .fromFile((fs.existsSync(buildDir) ? buildDir : devDir) + filename)
  .then(jsonObj => {
    fs.writeFile((fs.existsSync(buildDir) ? buildDir : devDir) + "/market_data.json", JSON.stringify(jsonObj, null, 2), "utf8", function(
      err
    ) {
      if (err) {
        return console.log(err);
      }
    });
    // printTimes(jsonObj);
    // printDataRates(jsonObj);
  });

function printTimes(jsonObj: any): void {
  jsonObj.forEach(row => {
    console.log(row.DateTime);
  });
}

function printDataRates(jsonObj: any): void {
  jsonObj.forEach(row => {
    console.log(row["Aggregate Feed Rates: Security Information Processors"]);
  });
}
