const assert = require('assert');

// --- keys
const uniqueKey = Symbol('userName');
const user = {};

user["userName"] = 'value for normal objects';
user[uniqueKey] = 'value for symbol';

// console.log('getting normal object', user.userName);
// console.log('getting symbol', user[Symbol('userName')]);
// console.log('getting symbol', user[uniqueKey]);

assert.deepEqual(user.userName, 'value for normal objects');

// sempre único em nível de endereço de memória
assert.deepEqual(user[Symbol('userName')], undefined);
assert.deepEqual(user[uniqueKey], 'value for symbol');

// é díficil de pegar, mas não é secreto!
// console.log('symbols', Object.getOwnPropertySymbols(user));
assert.deepEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática
user[Symbol.for('password')] = 123;
assert.deepEqual(user[Symbol.for('password')], 123);

// --- keys

// --- Well known symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // pop() => remove o último elemento do array e retorna o valor
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log('item', item);
// }

assert.deepEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    const items = this[kItems]
      .map(item => new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }).format(item));

    return new Intl.ListFormat('pt-BR', {
      style: 'long',
      type: 'conjunction'
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?';
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2019, 2, 2]
);

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2019, 2, 2)
];

assert.deepEqual(myDate[kItems], expectedDates);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]');
assert.throws(() => myDate + 1, TypeError);
// conversão explícita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2019');

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates);

;(async () => {
  const dates = [];
  for await (const date of myDate) {
    dates.push(date);
  }

  const expectedDatesInISOString = expectedDates.map(item => item.toISOString());
  assert.deepStrictEqual(dates, expectedDatesInISOString);
})();




