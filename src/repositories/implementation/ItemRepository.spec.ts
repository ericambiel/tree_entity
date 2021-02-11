import 'reflect-metadata';

import { typeorm } from '@providers/index';
import { container } from 'tsyringe';
import ItemTreeRepository from './ItemTreeRepository';

describe('Teste Item Tree Repository', () => {
  let treeRepository: ItemTreeRepository;

  beforeAll(async () => {
    // Turn off consoleLog - log, debug
    // jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'debug').mockImplementation(jest.fn());

    // Create connection to bd from ormConfig.ts
    await typeorm.createConnection()
      .then(async () => {
        treeRepository = await container.resolve(ItemTreeRepository);
      })
      .catch(error => {
        throw error;
      });
  });

  // describe('Insert', () => {
  //   it('should insert date on Entity Tree', async () => {
  //     const item = new ItemTreeEntity();
  //     item.description = 'Teste1';

  //     const result = treeRepository.findTrees();

  //     expect().toBe(result);
  //   });
  // });

  describe('Select', () => {
    it('should get date on Entity Tree', async () => {
      const result = await treeRepository.findTrees();

      expect(result).toBeInstanceOf(Array);
    });
  });
});
