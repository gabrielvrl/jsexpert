import NotImplementedExpection from "../notImplementedExpection.mjs";

export default class TableComponent {
  render(data) {
    throw new NotImplementedExpection(this.render.name);
  }
}