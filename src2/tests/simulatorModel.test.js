const simModel = require("../../build/modules/SimulatorModel");

test("simulator constructor", () => { 
    expect(() => {
    let model = new simModel.SimulatorModel(1000000,1);
    }).not.toThrow();

    expect(() => {
        let model = new simModel.SimulatorModel(1000000,100000);
    }).not.toThrow();

    expect(() => {
        let model = new simModel.SimulatorModel(1000000,-100);
    }).toThrow();

    expect(() => {
        let model = new simModel.SimulatorModel(-1000,1);
    }).toThrow();

    expect(() => {
        let model = new simModel.SimulatorModel(0.55,1);
    }).toThrow();

    expect(() => {
        let model = new simModel.SimulatorModel(1000000,0.11);
    }).toThrow();
});

test("update minute test", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.updateMinute();
    }).not.toThrow();
});

test("update input thread", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.updateInputThread();
    }).not.toThrow();
});

test("update processor", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.updateProcessor();
    }).not.toThrow();
});

test("print seconds", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.printSeconds();
    }).not.toThrow();
});

test("start test", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.start(0.1);
    }).not.toThrow();

    expect(() => {
        model.start(-0.1);
    }).toThrow();
});

test("get stats test", () => {
    let model = new simModel.SimulatorModel(1000,1);
    expect(() => {
        model.getStats();
    }).not.toThrow();
});

