import { SimulatorModel } from "./SimulatorModel";

export class Clock {
  model: SimulatorModel;
  totalMillisecondsPassed: number;
  totalSecondsPassed: number;

  constructor(model: SimulatorModel) {
    this.model = model;
    this.totalMillisecondsPassed = 0;
    this.totalSecondsPassed = 0;
  }

  // change counter values to match with the user input processor speed

  start(minutesToRun: number): void {
    if (minutesToRun < 0) {
      throw "Minutes to run must be a postive number."
    }
    for (
      let counter = 0;
      counter < minutesToRun * 6 * 10000000 + 1000000;
      counter++
    ) {
      // notify the input thread, ie. tell the input thread to add messages to buffer
      // every interation in this while loop is a simulated microsecond
      if (counter !== 0) {
        this.notifyInputThread();
      }

      // notify the processor, ie. tell the processor to process a message
      if (
        counter !== 0 &&
        counter % this.model.processor.getProcessingSpeed() === 0
      ) {
        this.notifyProcessor();
      }

      // 1 millisecond passed, important for latency in the stat calculator
      if (counter !== 0 && counter % 1000 === 0) {
        this.totalMillisecondsPassed += 1;
      }

      // 1 whole second passed
      if (counter !== 0 && counter % 1000000 === 0) {
        this.totalSecondsPassed += 1;
        this.model.printSeconds();
        this.model.inputThread.reset();
      }

      // when 60 seconds pass
      if (counter % 60000000 === 0) {
        this.notifyMinutePass();
      }
    }
  }

  getMillisecondsPassed(): number {
    return this.totalMillisecondsPassed;
  }

  getTotalSecondsPassed(): number {
    return this.totalSecondsPassed;
  }

  notifyMinutePass(): void {
    this.model.updateMinute();
  }

  notifyInputThread(): void {
    this.model.updateInputThread();
  }

  notifyProcessor(): void {
    this.model.updateProcessor();
  }
}
