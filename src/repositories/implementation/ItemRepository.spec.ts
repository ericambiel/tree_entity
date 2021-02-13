import 'reflect-metadata';

import { typeorm } from '@providers/index';
import { container } from 'tsyringe';
import ItemTreeRepository from './ItemTreeRepository';
import ItemTreeEntity from "@entities/ItemTreeEntity";

describe('Teste Item Tree Repository', () => {
  let treeRepository: ItemTreeRepository;

  beforeAll(async () => {
    // Turn off consoleLog - log, debug
    // jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'debug').mockImplementation(jest.fn());

    // Create connection to BD from ormConfig.ts
    await typeorm.createConnection()
      .then(async () => {
        treeRepository = await container.resolve(ItemTreeRepository);
      })
      .catch(error => {
        throw error;
      });
  });

  describe('Insert', () => {
    it('should insert date on Entity Tree', async () => {

      const item = new ItemTreeEntity();
      item.description = "item1";
      await treeRepository.save(item);

      const item2 = new ItemTreeEntity();
      item2.description = "item2";
      item2.parent = item;
      await treeRepository.save(item2);

      const item3 = new ItemTreeEntity();
      item3.description = "item3";
      item3.parent = item;
      await treeRepository.save(item3);

      const item4 = new ItemTreeEntity();
      item4.description = "item4";
      item4.parent = item2;
      await treeRepository.save(item4);

      const item5 = new ItemTreeEntity();
      item5.description = "Item5";
      item5.parent = item2;
      const result = await treeRepository.save(item5);

      expect(result).toBeInstanceOf(ItemTreeEntity);
    });
  });

  describe('Select', () => {
    it('should get date on Entity Tree', async () => {
      const result = await treeRepository.findTrees();

      expect(result).toBeInstanceOf(Array);
    });
  });
});
