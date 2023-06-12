const assert = require('assert');
const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');

const sinon = createSandbox();

;(async () => {
  {
    // fibonacci.execute recebe 5
    
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(5)];
    // for (const sequencia of fibonacci.execute(5)) {}

    const expectedCallCount = 6;
    assert.strictEqual(spy.callCount, expectedCallCount);

    const expectedResults = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResults, "os arrays não são iguais");

    const { args } = spy.getCall(2);
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais");
  }

  {
    // fibonacci.execute recebe 3

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(3)];

    const expectedCallCount = 4;
    assert.strictEqual(spy.callCount, expectedCallCount);

    const expectedResults = [0, 1, 1]
    assert.deepStrictEqual(results, expectedResults, "os arrays não são iguais");

    const { args } = spy.getCall(2);
    const expectedParams = [1, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais");
  }
})()