import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  UpdateResult,
} from 'typeorm';

/**
 * @template Interface
 * @template Entity
 */
export default interface IRepository<Interface, Entity> {
  create(data: Interface): Promise<Entity>;

  delete(id: string | number): Promise<DeleteResult>;

  update(id: string | number, data: Interface): Promise<UpdateResult>;

  findById(
    id: string | number,
    company?: string | number,
  ): Promise<Entity | undefined>;

  save(data: Interface): Promise<Entity>;

  softDelete(id: string | number): Promise<UpdateResult>;

  softRemove(entity: DeepPartial<Entity>): Promise<Entity>;

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
}
