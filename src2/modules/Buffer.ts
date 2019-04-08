export class Buffer {
  maxSize: number;
  messages: Map<number, number>;
  firstIndex: number | undefined;
  usedSpace: number;

  constructor(maxSize: number) {
    if (!Number.isInteger(maxSize) || maxSize < 1) {
      throw `Buffer size cannot be ${maxSize}. Valid buffer sizes are positive integers.`;
    }
    this.maxSize = maxSize;
    this.usedSpace = 0;
    this.messages = new Map<number, number>();
  }

  clearSpace(): number {
    if (this.firstIndex === undefined) {
      return 0;
    } else {
      if (this.messages.get(this.firstIndex) - 1 === 0) {
        this.messages.delete(this.firstIndex);
        this.setFirstKey();
      } else {
        this.messages.set(
          this.firstIndex,
          this.messages.get(this.firstIndex) - 1
        );
      }
      this.usedSpace--;
      return this.firstIndex;
    }
  }

  takeSpace(space: number, currTime: number): number {
    if (space <= 0) {
      throw `Unable to take up ${space} blocks. To take space, use a value greater than 0.`;
    }

    // if there is not enough free space, take up the remaining free space at least
    if (space > this.getFreeSpace()) {
      let temp = this.getFreeSpace();
      if (temp === 0) {
        return temp;
      }
      if (this.messages.has(currTime)) {
        this.messages.set(currTime, this.messages.get(currTime) + temp);
      } else {
        this.messages.set(currTime, temp);
      }
      this.usedSpace = this.maxSize;
      return temp;
    }

    // otherwise just take some space
    if (this.messages.has(currTime)) {
      this.messages.set(currTime, this.messages.get(currTime) + space);
    } else {
      this.messages.set(currTime, space);
    }
    this.usedSpace += space;
    
    if (this.firstIndex === undefined) {
      this.setFirstKey();
    }

    return space;
  }

  setFirstKey(): void {
    let messageArray = this.messages.keys().next();
    this.firstIndex = messageArray.value;
  }

  reset(): void {
    this.usedSpace = 0;
    this.messages.clear();
  }

  getFreeSpace(): number {
    return this.maxSize - this.usedSpace;
  }

  getMaxSize(): number {
    return this.maxSize;
  }

  getUsedSpace(): number {
    return this.usedSpace;
  }
}
