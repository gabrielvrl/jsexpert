import MongoDB from "mongodb";

export default class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, "");
    this.dbName = dbName.replace(/\W/, '');

    this.collection = "warriors"
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // console.log('client', client)
    console.log('----')
    await client.connect();
    console.log('----')
    const db = client.db(this.db).collection(this.collection);

    this.#instance = db;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }

  async read(item) {
    return this.#instance.find(item).toArray();
  }
}