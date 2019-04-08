export class StatCalculator 
{
    processedMessages: number = 0;
    lostMessages: number = 0;
    mostLostMessage: number = 0;

    percentile50: number = 0;
    percentile75: number = 0;
    percentile90: number = 0;
    percentile99: number = 0;
    percentile100: number = 0;              //99.9th percentile

    latencyList: any = {}
    sorted: Array<number> = [];
    latencySum: number = 0;

    //Send in the number of messages that were lost
    addLostMessages(messages: number): void {
        if (messages <= 0 || !Number.isInteger(messages)){
          throw "Lost messages value must be an integer > 0";
        }

        this.lostMessages += messages;
    
        //The theoretical max buffer should be based off the largest set of lost messages
        if (messages > this.mostLostMessage){
          this.mostLostMessage = messages;
        }
      }

    //Send in new message latency value (in microseconds)
    addLatency(latency: number): void{
        if (latency < 0){
            throw "Latency value must be an number >= 0";
        }
        this.processedMessages++;
        this.latencySum += latency;

        if (this.latencyList[latency] !== undefined)
        {
            this.latencyList[latency]++;
        }
        else{
            this.latencyList[latency] = 1;
        }
    }

    //Call this upon program termination to set percentile values
    calcPercentiles(): void {
        var valArray: Array<number>;
        for(var key in this.latencyList) {
            this.sorted.push(parseInt(key));
        }
        this.sorted.sort((a, b) => a - b);

        //Calculate 50th percentile
        valArray = this.calculations(this.processedMessages * 0.5 - 1, 0, 0, 0);
        this.percentile50 = valArray[0];

        //Calculate 75th percentile starting from previous index
        valArray = this.calculations(this.processedMessages * 0.75 - 1, valArray[1], valArray[2], valArray[3]);
        this.percentile75 = valArray[0];

        //Calculate 90th percentile starting from previous index
        valArray = this.calculations(this.processedMessages * 0.90 - 1, valArray[1], valArray[2], valArray[3]);
        this.percentile90 = valArray[0];

        //Calculate 99th percentile starting from previous index
        valArray = this.calculations(this.processedMessages * 0.99 - 1, valArray[1], valArray[2], valArray[3]);
        this.percentile99 = valArray[0];

        //Calculate 99.9th percentile starting from previous index
        valArray = this.calculations(this.processedMessages * 0.999 - 1, valArray[1], valArray[2], valArray[3]);
        this.percentile100 = valArray[0];
    }

    //For statCalculator only!
    calculations(target: number, v1: number, v2: number, index: number): Array<number>{
        if (Number.isInteger(target)){
            for (var a = v1; a < this.sorted.length; a++){
                for (var b = v2; b < (this.latencyList[(this.sorted[a])]); b++){
                    if (target == index){
                        if ((this.latencyList[(this.sorted[a])]) > b+1){
                            return [(this.sorted[a]), a, b, index];
                        }
                        else{
                            return [((this.sorted[a]) + (this.sorted[a+1]))/2, a, b, index];
                        }
                    }
                    index++;
                }
                v2=0;
            }
        }
        else{
            target = Math.ceil(target);
            for (var a = v1; a < this.sorted.length; a++){
                for (var b = v2; b < (this.latencyList[(this.sorted[a])]); b++){
                    if (target == index){
                        return [(this.sorted[a]), a, b, index];
                    }
                    index++;
                }
                v2=0;
            }

        }
    }

    //Find the average latency per processed message
    calcAverageLatency(): number{
        return this.latencySum/this.processedMessages;
    }

    //Find how many messages were processed per ms
    calcThroughput(): number {
        return (this.processedMessages/this.latencySum)*1000000;
    }

    //Return the max buffer size needed to have lost 0 messages given the current processing speed
    getTheoreticalMaxBuffer(buffMax: number): number {
        return buffMax + this.mostLostMessage;
    }

    //Various getters for the module's variables
    getLostMessages(): number {
        return this.lostMessages;
    }
    getProcessedMessages(): number {
        return this.processedMessages;
    }
    getPercentile50(): number {
        return this.percentile50;
    }
    getPercentile75(): number {
        return this.percentile75;
    }
    getPercentile90(): number {
        return this.percentile90;
    }
    getPercentile99(): number {
        return this.percentile99;
    }
    getPercentile100(): number {
        return this.percentile100;
    }
}