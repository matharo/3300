const inputThread = require("../../build/modules/InputThread");
const buffer = require("../../build/modules/Buffer");
const statCalc = require("../../build/modules/StatCalculator");

test("creating inputThread", () => {
  expect(() => {
      let input1 = new inputThread.InputThread();
  }).not.toThrow();
});

test("test rate", () => {
  let input1 = new inputThread.InputThread();

  //test 1A
  expect(() => {
      input1.setRate(1);
  }).not.toThrow();

  //test 1B
  expect(() => {
    input1.setRate(0);
  }).not.toThrow();

  //test 2A
  input1.setRate(1000000);
  expect(input1.getRate()).toBe(1);

  //test 2B
  input1.setRate(1000001);
  expect(input1.getRate()).toBeGreaterThan(1);

  //test 2C
  input1.setRate(999999);
  expect(input1.getRate()).toBeLessThan(1);
});

test("test add", () => {
  let input1 = new inputThread.InputThread();
  let stat = new statCalc.StatCalculator();

  //Test 1
  let buff = new buffer.Buffer(100);
  input1.setRate(500000);
  console.log(input1.getRate());
  input1.addMessages(buff, stat);
  expect(input1.getFraction()).toBe(.5);

});
