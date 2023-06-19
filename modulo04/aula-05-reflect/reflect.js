'use strict'

const assert = require('assert');

// garantir semântica e segurança em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
};

// Function.prototype.apply = () => { throw new TypeError('Eita!') }
// myObj.add.apply = function () { throw new TypeError('Eita!') }

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// essa aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('Vixxx') }

assert.throws(() => myObj.add.apply({}, []), {
  name: 'TypeError',
  message: 'Vixxx'
});

// usando reflect:

// --- apply
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// --- defineProperty

// questões semânticas
function myDate() { };

// feio pra caramba! Tudo é Object, mas Object adicionando prop para function?
Object.defineProperty(myDate, 'withObject', { value: () => 'Hey there' });

// agora faz mais sentido
Reflect.defineProperty(myDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(myDate.withObject(), 'Hey there');
assert.deepStrictEqual(myDate.withReflection(), 'Hey dude');

// --- defineProperty

// --- deleteProperty
const withDelete = { user: 'GabrielVarela' };
// imperformático, evitar ao máximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'XuxaDaSilva' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// --- deleteProperty


// --- get

// Deveríamos fazer um get somente em intâncias de referência
assert.deepStrictEqual(1['userName'], undefined);
// com o reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// --- get

// --- has
assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));
// --- has

// --- ownKeys
const user = Symbol('user');
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'GabrielVarela'
};

// Com os métodos de Object, temos que fazer 2 requisições
// maneira "esquisita"
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
];
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// com reflection é só um método
// maneira "certa"
const objectKeys2 = Reflect.ownKeys(databaseUser);
assert.deepStrictEqual(objectKeys, objectKeys2);

// --- ownKeys








