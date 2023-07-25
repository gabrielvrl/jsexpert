const assert = require('assert');

// usado na maioria das vezes para Listas de itens únicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))
// console.log('Set with add item per item', set)
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"])

// console.log('set.keys()', set.keys())
// console.log('set.values()', set.values()) // só existe por conta do Map

// no Array comum, para saber se um item existe, precisamos fazer 
// arr.indexOf('1') !== -1 ou arr.includes('1')
// já no Set, temos o has
assert.ok(set.has('3'))

// Mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não no array e é isso
// na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em uma lista e não
// tem na outra e assim por diante

// tem nos dois arrays
const users01 = new Set([
  'Gabriel',
  'Maria',
  'Manoel'
]);

const users02 = new Set([
  'João',
  'Maria',
  'Pedro'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['Maria']);

const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['Gabriel', 'Manoel']);

// weakSet
// mesma ideia do weakMap
// não é enumerável (iterável)
// só trabalha com chaves como referência
// só tem métodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
// weakSet.add(user2);
// weakSet.delete(user);
// weakSet.has(user2);

