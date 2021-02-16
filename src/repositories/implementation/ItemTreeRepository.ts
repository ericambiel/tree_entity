import { injectable } from 'tsyringe';
import { BaseTreeRepository } from '@providers/typeorm';
import ItemTreeEntity from '@entities/ItemTreeEntity';
import IItemDTO from '@dtos/IItemDTO';
import IItemRepository from '@repositories/IItemRepository';

/**
 * @author Eric Ambiel
 */
@injectable()
export default class ItemTreeRepository
  extends BaseTreeRepository<IItemDTO, ItemTreeEntity>
  implements IItemRepository {
  constructor() {
    super(ItemTreeEntity);
  }
}
