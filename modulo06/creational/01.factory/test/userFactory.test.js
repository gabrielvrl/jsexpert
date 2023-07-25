const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

// poderia estar em outro arquivo
const dbData = [ { name: 'Gabriel' }, { name: 'Gabriel' } ]
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}
// 

rewiremock(() => require('../src/util/database')).with(MockDatabase);

;(async () => {
  {
    const expected = [{ name: 'GABRIEL' }, { name: 'GABRIEL' }];
    rewiremock.enable();
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }

  {
    const expected = [{ name: 'GABRIEL' }];
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();