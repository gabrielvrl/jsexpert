import { RickAndMortyUSA } from "../integrations/rickAndMortyUSA.js";

export default class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return await RickAndMortyUSA.getCharactersFromXML();
  }
}