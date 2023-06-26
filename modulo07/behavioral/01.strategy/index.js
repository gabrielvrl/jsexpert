import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://gabrielvarela:senha0001@localhost:5432/heroes";
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://gabrielvarela:senhaadmin@localhost:27018/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();

const data = [{
  name: "Batman",
  type: "transaction"
}, {
  name: "Alfred",
  type: "activityLog"
}];

// await postgresContext.create({ name: data[0].name });
// console.log(await postgresContext.read());

// await mongoDBContext.create({ name: data[1].name });
// console.log(await mongoDBContext.read());

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

for(const {type, name} of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}