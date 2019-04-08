import { Buffer } from "./Buffer";
import { InputThread } from "./InputThread";
import { Processor } from "./Processor";
import { StatCalculator } from "./StatCalculator";
import { Clock } from "./Clock";

interface outputLog {
  averageThroughput: string;
  averageLatency: string;
  maxBufferSizeNeeded: number;
  messagesProcessed: number;
  messagesLost: number;
  timeElasped: number;
  _50: number;
  _75: number;
  _90: number;
  _99: number;
  _100: number;
}

interface parsedCsv {
  DateTime: string;
  "Aggregate Feed Rates: Security Information Processors": string;
}

export class SimulatorModel {
  buffer: Buffer;
  csv: parsedCsv[];
  inputThread: InputThread;
  processor: Processor;
  statCalculator: StatCalculator;
  clock: Clock;

  constructor(bufferSize: number, processorSpeed: number) {
    this.buffer = new Buffer(bufferSize);
    this.csv = require("../data/market_data.json");
    this.inputThread = new InputThread();
    this.processor = new Processor(processorSpeed);
    this.statCalculator = new StatCalculator();
    this.clock = new Clock(this);
  }

  updateMinute(): void {
    let newRate = Number(
      this.csv[this.clock.getTotalSecondsPassed() / 60][
        "Aggregate Feed Rates: Security Information Processors"
      ]
    );
    this.inputThread.setRate(newRate);
  }

  updateInputThread(): void {
    this.inputThread.addMessages(
      this.buffer,
      this.statCalculator,
      this.clock.getMillisecondsPassed()
    );
  }

  updateProcessor(): void {
    this.processor.processMessages(
      this.buffer,
      this.statCalculator,
      this.clock.getMillisecondsPassed()
    );
  }

  printSeconds(): void {
    console.log(`Time elapsed: ${this.clock.getTotalSecondsPassed()} seconds.`);
  }

  start(minutesToRun: number): void {
    this.clock.start(minutesToRun);
  }

  getStats(): outputLog | string {
    if (this.statCalculator.getProcessedMessages() < 1) {
      return "Not enough time has passed for a single message to have been processed.";
    }
    this.statCalculator.calcPercentiles();
    return {
      averageThroughput: `${this.statCalculator.calcThroughput()} messages per second`,
      averageLatency: `${this.statCalculator.calcAverageLatency()} microseconds per message`,
      maxBufferSizeNeeded: this.statCalculator.getTheoreticalMaxBuffer(
        this.buffer.getMaxSize()
      ),
      messagesProcessed: this.statCalculator.getProcessedMessages(),
      messagesLost: this.statCalculator.getLostMessages(),
      timeElasped: this.clock.getTotalSecondsPassed(),
      _50: this.statCalculator.getPercentile50(),
      _75: this.statCalculator.getPercentile75(),
      _90: this.statCalculator.getPercentile90(),
      _99: this.statCalculator.getPercentile99(),
      _100: this.statCalculator.getPercentile100()
    };
  }
}

/* 
Moved to main.ts
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
*/
