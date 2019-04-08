const buffer = require("../../build/modules/Buffer");

test("buffer constructor", () => {
  expect(() => {
    let b1 = new buffer.Buffer(100);
  }).not.toThrow();

  expect(() => {
    let b2 = new buffer.Buffer(1000);
  }).not.toThrow();

  expect(() => {
    let b3 = new buffer.Buffer(1000000000000000000000000000000);
  }).not.toThrow();

  expect(() => {
    let b4 = new buffer.Buffer(0);
  }).toThrow();

  expect(() => {
    let b5 = new buffer.Buffer(-1);
  }).toThrow();
});

test("return max size", () => {
  let b1 = new buffer.Buffer(100);
  let b2 = new buffer.Buffer(1000);
  let b3 = new buffer.Buffer(1000000000000000000000000000000);
  expect(b1.getMaxSize()).toEqual(100);
  expect(b2.getMaxSize()).toEqual(1000);
  expect(b3.getMaxSize()).toEqual(1000000000000000000000000000000);
});

test("take space", () => {
  let b1 = new buffer.Buffer(100);
  expect(b1.takeSpace(1)).toBe(1);
  expect(b1.getFreeSpace()).toBe(99);
  b1.reset();

  expect(b1.takeSpace(100)).toBe(100);
  expect(b1.getFreeSpace()).toBe(0);
  b1.reset();

  expect(b1.takeSpace(101)).toBe(100);
  expect(b1.getFreeSpace()).toBe(0);
  b1.reset();

  expect(b1.takeSpace(100000000000000000000)).toBe(100);
  expect(b1.getFreeSpace()).toBe(0);
  b1.reset();

  expect(() => {
    b1.takeSpace(0);
  }).toThrow();
  b1.reset();

  expect(() => {
    b1.takeSpace(-1);
  }).toThrow();
  b1.reset();

  expect(() => {
    b1.takeSpace(-100000000000000000000);
  }).toThrow();
  b1.reset();
});

test("all functions together", () => {
  let b1 = new buffer.Buffer(100);

  expect(b1.clearSpace()).toBe(0);

  expect(b1.takeSpace(4, 0)).toBe(4);
  expect(b1.clearSpace()).toBe(0);
  expect(b1.clearSpace()).toBe(0);
  expect(b1.clearSpace()).toBe(0);
  expect(b1.clearSpace()).toBe(undefined);


  expect(b1.takeSpace(100, 1)).toBe(100);
  expect(b1.clearSpace()).toBe(1);
  expect(b1.clearSpace()).toBe(1);
  expect(b1.clearSpace()).toBe(1);
  expect(b1.clearSpace()).toBe(1);

  b1.reset();
});
