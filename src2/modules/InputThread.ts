import { Buffer } from "./Buffer";
import { StatCalculator } from "./StatCalculator";

export class InputThread {
  currentRate: number;
  currentRateInMicroseconds: number;
  messagesAttemptedThisSecond: number;

  constructor() {
    this.currentRate = 0;
    this.currentRateInMicroseconds = 0;
    this.messagesAttemptedThisSecond = 0;
  }

  addMessages(buffer: Buffer, statCalculator: StatCalculator, millisecondsPassed: number): void {
    // Round up for messages to add if dealing with fractions at
    // the microsecond rate level
    let messagesToAdd: number = Math.ceil(this.currentRateInMicroseconds);
    this.messagesAttemptedThisSecond += messagesToAdd;

    // When all messages for the given minute have been added, do nothing else
    if (this.messagesAttemptedThisSecond >= this.currentRate) {
      // console.log('at rate cap');
      return;
    }

    // take space in buffer and store the total amount of space taken
    let spaceTaken: number = buffer.takeSpace(messagesToAdd, millisecondsPassed);

    // add any messages that could not be added to the stat calculator
    if (spaceTaken < messagesToAdd) {
      statCalculator.addLostMessages(messagesToAdd - spaceTaken);
      // console.log('--- messages lost');
      // console.log('total messages added: ' + (messagesToAdd - spaceTaken));
      // console.log('buffer space taken:   ' + buffer.getUsedSpace());
    } else {
      // console.log('--- all messages added');
      // console.log('total messages added: ' + messagesToAdd);
      // console.log('buffer space taken:   ' + buffer.getUsedSpace());
    }
  }

  reset(): void {
    this.messagesAttemptedThisSecond = 0;
  }

  getRate(): number {
    return this.currentRate;
  }

  getRateInMicroseconds(): number {
    return this.currentRateInMicroseconds;
  }

  setRate(rate: number): void {
    this.currentRate = rate;
    // Convert rate from messages/second to messages/microsecond
    this.currentRateInMicroseconds = rate / 1000000.0;
  }

  getMessagesAttemptedThisMinute(): number {
    return this.messagesAttemptedThisSecond;
  }

  setMessagesAttemptedThisMinute(messages: number) {
    this.messagesAttemptedThisSecond = messages;
  }

}
