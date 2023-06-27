import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js';
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA';

describe('#RickAndMortyUSA', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersXML', async () => {
    const USAIntegration = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name
    ).mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toStrictEqual([]);
    expect(USAIntegration).toHaveBeenCalled();
  })
  
})