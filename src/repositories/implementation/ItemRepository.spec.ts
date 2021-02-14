import 'reflect-metadata';

import { container } from 'tsyringe';
import ItemTreeRepository from './ItemTreeRepository';
import ItemTreeEntity from "@entities/ItemTreeEntity";
import {classToPlain} from "class-transformer";
import { Connection }  from "typeorm";
import { closeTestingConnections, createTestingConnections } from "@helpers/testTypeOrmUtils";

describe('Teste Item Tree Repository', () => {
  let treeRepository: ItemTreeRepository;
  let connections: Connection[];

  beforeAll(async () => {
    // Turn off consoleLog - log, debug
    // jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'debug').mockImplementation(jest.fn());

    connections = await createTestingConnections({ entities: [ ItemTreeEntity ] })
    treeRepository = await container.resolve( ItemTreeRepository );
  });

  // beforeEach(async () => {
  //   await reloadTestingDatabases(connections); // Resync and delete all tables from entities
  // });

  afterAll(() => closeTestingConnections(connections));


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

      // const item = classToPlain(ItemTreeEntity);
      // item.description = "item1";
      // await treeRepository.save(plainToClassZ(item, ItemTreeEntity));
      //
      // const item2 = classToPlain(ItemTreeEntity);
      // item2.description = "item2";
      // item2.itemParent = plainToClassFromExist(item, ItemTreeEntity);
      // await treeRepository.save(plainToClassFromExist(item2, ItemTreeEntity));
      //
      // const item3 = classToPlain(ItemTreeEntity);
      // item3.description = "item3";
      // item3.itemParent = plainToClassFromExist(item, ItemTreeEntity);
      // await treeRepository.save(plainToClassFromExist(item3, ItemTreeEntity));
      //
      // const item4 = classToPlain(ItemTreeEntity);
      // item4.description = "item4";
      // item4.itemParent = plainToClassFromExist(item2, ItemTreeEntity);
      // await treeRepository.save(plainToClassFromExist(item4, ItemTreeEntity));
      //
      // const item5 = classToPlain(ItemTreeEntity);
      // item5.description = "Item5";
      // item5.itemParent = plainToClassFromExist(item2, ItemTreeEntity);
      // const result = await treeRepository.save(plainToClassFromExist(item5, ItemTreeEntity));

      expect(result).toBeInstanceOf(ItemTreeEntity);
    });
  });

  describe('Select', () => {
    it('should get date on Entity Tree', async () => {
      const result = classToPlain(await treeRepository.findTrees());

      expect(result).toBeInstanceOf(Array);
    });
  });
});
