// I run this with Code Runner visual studio code extension
const statCalc = require("../../build/modules/StatCalculator");

function main(){
    let testStat = new statCalc.StatCalculator();

    valuesToAdd = 100000 //The number of latency values the list will hold. Can go up to billions

    startTime1 = new Date();
    var x;
    for(x = 1; x <= valuesToAdd; x++)
    {
        //testStat.addLatency(x);     //For simple incremental latencies
        testStat.addLatency(100 + Math.ceil(Math.random()*900)) //For random latency values
    }
    endTime1 = new Date();
    console.log("Adding messages took " + (endTime1 - startTime1)/valuesToAdd + " ms per messages");

    //console.log(latencyList);     //To view the list. Not recommended for large lists

    startTime2 = new Date();
    testStat.calcPercentiles();    
    endTime2 = new Date();
    console.log("Percentile calculation took " + (endTime2 - startTime2)/1000 + " seconds");

    console.log("\tp50:   " + testStat.getPercentile50());
    console.log("\tp75:   " + testStat.getPercentile75());
    console.log("\tp90:   " + testStat.getPercentile90());
    console.log("\tp99:   " + testStat.getPercentile99());
    console.log("\tp99.9: " + testStat.getPercentile100());

    console.log("Processed messages: " + testStat.getProcessedMessages());
    console.log("Average latency: " + testStat.calcAverageLatency() + " microseconds per message");
    console.log("Average throughput: " + testStat.calcThroughput() + " messages per second");
}

main();
// I run this with Code Runner visual studio code extension