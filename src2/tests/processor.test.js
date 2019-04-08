const processor = require("../../build/modules/Processor");

test("construct processor", () => {
  expect(() => {
    let p1 = new processor.Processor("1s");
  }).not.toThrow();

  expect(() => {
    let p1 = new processor.Processor("1m");
  }).not.toThrow();

  expect(() => {
    let p1 = new processor.Processor("1u");
  }).not.toThrow();

  expect(() => {
    let p1 = new processor.Processor("1n");
  }).not.toThrow();

  expect(() => {
    let p1 = new processor.Processor("s");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("m");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("u");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("n");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("1");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-100s");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-100m");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-100u");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-100n");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100a");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100b");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100c");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100d");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("fail");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("1000fail");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("-1000fail");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("smun");
  }).toThrow();

  expect(() => {
    let p1 = new processor.Processor("100su");
  }).toThrow();
});

