"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



const { describe, it } = mocha;
const { expect } = chai;

describe('Person', () => {
  it('Should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 Bike,Avião 10000 2000-01-01 2002-02-02');
    const expected = {
      id: '1',
      vehicles: ['Bike', 'Avião'],
      kmTraveled: '10000',
      from: '2000-01-01',
      to: '2002-02-02'
    };

    expect(person).to.be.deep.equal(expected);
  })

  it('Should format values', () => {
    const person = new Person({
      id: '1',
      vehicles: ['Bike', 'Avião'],
      kmTraveled: '10000',
      from: '2000-01-01',
      to: '2002-02-02'
    });

    const result = person.formatted('pt-BR');
    const expected = {
      id: 1,
      vehicles: 'Bike e Avião',
      kmTraveled: '10.000 km',
      from: '01 de janeiro de 2000',
      to: '02 de fevereiro de 2002'
    };

    expect(result).to.be.deep.equal(expected);
  });
});