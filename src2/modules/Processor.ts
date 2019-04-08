import { Buffer } from "./Buffer";
import { StatCalculator } from "./StatCalculator";

export class Processor {
  speed: number;

  constructor(speed: number) {
    if (!Number.isInteger(speed) || speed < 2) {
      throw "Please use a positive integer greater than 1 for the processor speed."
    }
    this.speed = speed;
  }

  getProcessingSpeed(): number {
    return this.speed;
  }

  processMessages(
    buffer: Buffer,
    stat: StatCalculator,
    currTime: number
  ): void {
    let arrivalTime = buffer.clearSpace();
    if (arrivalTime) {
      let latency = currTime - arrivalTime;
      stat.addLatency(latency);
    } 
  }
}
