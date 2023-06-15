const { deepStrictEqual } = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;
console.log('counter', counter); // 0
console.log('counter2', counter2); // 1

// primitive types are passed by value

// objects are passed by reference
const item = { counter: 0 };
const item2 = item;

// item2.counter++;
// console.log('item', item); // { counter: 1 }
// console.log('item2', item2); // { counter: 1 }

// tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

// tipo de referência copia o endereço de memória e aponta para o mesmo lugar
item2.counter++;
deepStrictEqual(item, { counter: 1 });
item.counter++;
deepStrictEqual(item2, { counter: 2 });