export default class NotImplementedExpection extends Error {
  constructor(message) {
    super(`the "${message}" function was not implemented`);
    this.name = 'NotImplementedExpection';
  }
}