import 'reflect-metadata';

import { container } from 'tsyringe';
import ItemTreeEntity from '@entities/ItemTreeEntity';
import { Connection } from 'typeorm';
import {
  closeTestingConnections,
  createTestingConnections,
  reloadTestingDatabases,
} from '@helpers/testTypeOrmUtils';
import ItemTreeRepository from './ItemTreeRepository';

describe('Test Item Tree Repository', () => {
  let itemTreeRepository: ItemTreeRepository;
  let connections: Connection[];

  beforeAll(async () => {
    // Turn off consoleLog - log, debug
    // jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'debug').mockImplementation(jest.fn());

    connections = await createTestingConnections({
      entities: [ItemTreeEntity],
    });
  });

  beforeEach(async () => {
    await reloadTestingDatabases(connections); // Re-sync and delete all tables from entities
    itemTreeRepository = await container.resolve(ItemTreeRepository);
  });

  afterAll(() => closeTestingConnections(connections));

  it('should insert date on Entity Tree and retrieve them.', async () => {
    // Create entities in Databases and associate them each other.
    const item = new ItemTreeEntity();
    item.description = 'item1';
    await itemTreeRepository.treeRepository.save(item);

    const item2 = new ItemTreeEntity();
    item2.description = 'item2';
    item2.parent = item;
    await itemTreeRepository.treeRepository.save(item2);

    const item3 = new ItemTreeEntity();
    item3.description = 'item3';
    item3.parent = item;
    await itemTreeRepository.treeRepository.save(item3);

    const item4 = new ItemTreeEntity();
    item4.description = 'item4';
    item4.parent = item2;
    await itemTreeRepository.treeRepository.save(item4);

    const item5 = new ItemTreeEntity();
    item5.description = 'Item5';
    item5.parent = item2;
    const result = await itemTreeRepository.treeRepository.save(item5);

    expect(result).toBeInstanceOf(ItemTreeEntity);

    // Find one one Root in tree contain result bellow.
    const rootCategories = await itemTreeRepository.treeRepository.findRoots();
    expect(rootCategories).toEqual(
      expect.arrayContaining([{ id_general_item: 1, description: 'item1' }]),
    );

    // Find all ancestors from given entity, 2 with result bellow
    const item2Parent = await itemTreeRepository.treeRepository.findAncestors(
      item2,
    );
    expect(item2Parent.length).toEqual(2);
    expect(item2Parent).toEqual(
      expect.arrayContaining([
        { id_general_item: 1, description: 'item1' },
        { id_general_item: 2, description: 'item2' },
      ]),
    );

    // Find all descendants from given entity, 5 with result bellow.
    const item2Children = await itemTreeRepository.treeRepository.findDescendants(
      item,
    );
    expect(item2Children.length).toEqual(5);

    expect(item2Children).toEqual(
      expect.arrayContaining([
        { description: 'item1', id_general_item: 1 },
        { description: 'item2', id_general_item: 2 },
        { description: 'item3', id_general_item: 3 },
        { description: 'item4', id_general_item: 4 },
        { description: 'Item5', id_general_item: 5 },
      ]),
    );
  });
});
