import NotImplementedExpection from "../notImplementedExpection.mjs";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedExpection(this.createTable.name);
  }
}