9999999999999999 // 16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false
3 > 2 >= 1
// true

"B" + "a" + + "a" + "a"
// BaNaNa

'1' == 1
'1' === 1

// --------------

console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');

console.assert(('hello' || 123) === 'hello', '|| returns the first element if both are true');
console.assert(('hello' && 123) === 123, '&& returns the last element if both are true');

// --------------

const item = {
  name: 'Gabriel',
  age: 25,
  // string: se o primeiro não for primitivo, chama o valueOf
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  },
  // number: se o primeiro não for primitivo, chama o toString
  valueOf() {
    return { hey: 'dude' } // NaN
  },
  // prioridade máxima!
  [Symbol.toPrimitive](coercionType){
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType] || types.string
  }
}

// console.log('toString', String(item))

// // Vai retornar NaN pois o toString retornou a string
// console.log('valueOf', Number(item))

// // depois de adicionar o toPrimitive
// console.log('String', String(item))
// console.log('Number', Number(item))
// // chama a conversão default!
// console.log('Date', new Date(item))

console.assert(item + 0 === '{"name":"Gabriel","age":25}0')
// console.log('!!item is true?', !!item)
console.assert(!!item)

// console.log('string.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"Gabriel","age":25}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item), 'implicit coercion with ==')

const item2 = {...item, name: 'Zézin', age: 20}
// console.log('New Object', item2)
console.assert(item2.name === 'Zézin' && item2.age === 20)