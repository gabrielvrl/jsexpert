const { expect } = require('chai');
const { it, describe } = require('mocha');

const { productValidator } = require('../src');
const ProductObjectMother = require('./model/productObjectMother');

describe('Test Mother Object', () => {
  it('shouldn\'t  return error with valid product', () => {
    const product = ProductObjectMother.valid();
    const result = productValidator(product);

    const expected = {
      result: true,
      errors: []
    }

    expect(result).to.be.deep.equal(expected);
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductObjectMother.invalidId();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: ['id: invalid length, current [1] expected to be between 2 and 20']
      }
  
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductObjectMother.invalidName();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: ['name: invalid name, current [abc123] expected to be only words']
      }
  
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductObjectMother.invalidPrice();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: ['price: invalid price, current [2000] expected to be between 0 and 1000']
      }
  
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductObjectMother.invalidCategory();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: ['category: invalid category, current [mechanic] expected to be electronic or organic']
      }
  
      expect(result).to.be.deep.equal(expected);
    })
  })
})