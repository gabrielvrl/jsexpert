const assert = require('assert');

const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello');

// usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser string ou Symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' });

// console.log('get', myMap.get(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' });

// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto 
// item.key = se não existir, retorna undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'ErickWendel' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// impertformático para o JavaScript
assert.ok(myMap.delete(onlyReferenceWorks));

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Erick",{"text":"two"}],[true,null]]');

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo da chave, pode substituir um comportamento
// nativo do objeto
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'
const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
};

// não tem restrição de nome de chave
myMap.set(actor);
assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da para limpar um Obj sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// WeakMap
// Pode ser coletado após perder as referências
// usado em casos bem específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referência e que você já conhece
// mais leves e prevê leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.set(1, 2); // dá erro, pois a chave tem que ser uma referência
// weakMap.set('power', 'speed'); // dá erro, pois a chave tem que ser uma referência
// weakMap.set(Symbol(), 'Symbol'); // dá erro, pois a chave tem que ser uma referência
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)



