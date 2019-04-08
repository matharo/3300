const statCalc = require("../../build/modules/StatCalculator");

test("creating stat calculator", () => {
    expect(() => {
        let testStat = new statCalc.StatCalculator();
    }).not.toThrow();
});

test("adding lost messages", () => {
    let testStat = new statCalc.StatCalculator();
    expect(() => {
        testStat.addLostMessages(100);
    }).not.toThrow();
    
    expect(() => {
        testStat.addLostMessages(-50);
    }).toThrow();
    
});

test("adding latency", () => {
    let testStat = new statCalc.StatCalculator();
    expect(() => {
        testStat.addLatency(100);
    }).not.toThrow();

    expect(() => {
        testStat.addLatency(-1);
    }).toThrow();

    expect(() => { 
        testStat.addLatency(0);
    }).not.toThrow();
});

test("Accuracy of values", () => {
    let testStat = new statCalc.StatCalculator();
    var i;
    for(i = 1; i <= 100; i++)
    {
        testStat.addLatency(i);
    }

    expect(() => { 
        testStat.calcPercentiles();
    }).not.toThrow();

    expect(testStat.getPercentile50()).toEqual(50.5);
    expect(testStat.getPercentile75()).toEqual(75.5);
    expect(testStat.getPercentile90()).toEqual(90.5);
    expect(testStat.getPercentile99()).toEqual(99.5);
    expect(testStat.getPercentile100()).toEqual(100);

    expect(testStat.calcAverageLatency()).toEqual(50.5);
    expect(testStat.calcThroughput()).toEqual((100/5050)*1000000);
});
