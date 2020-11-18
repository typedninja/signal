import { Signal } from "../signal";

test("starts lowered", () => {
  const signal = new Signal();

  expect(signal.raised).toEqual(false);
});

test("resolves on raise", done => {
  const signal = new Signal();

  signal.then(() => {
    done();
  });

  signal.raise();
});

test("destroyed signal rejects then", () => {
  const signal = new Signal();

  signal.destroy();

  expect(signal.then(() => {})).rejects.toThrow((signal as any).error());
});

test("destroyed signal throws on raise", () => {
  const signal = new Signal();

  signal.destroy();

  expect(() => signal.raise()).toThrow((signal as any).error());
});

test("destroyed signal throws on reset", () => {
  const signal = new Signal();

  signal.destroy();

  expect(() => signal.reset()).toThrow((signal as any).error());
});
