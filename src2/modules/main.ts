import { SimulatorModel} from "./SimulatorModel";

function main() {
  let model = new SimulatorModel(
    Number(process.argv[2]),
    Number(process.argv[3])
  );
  model.start(Number(process.argv[4]));
  console.log("please wait while we calculate latency values...");
  console.log(model.getStats());
}

main();
