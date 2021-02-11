import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import IRepository from '../IRepository';
import ClassType from "@helpers/classType";

/**
 * @template Interface
 * @template Entity
 */
export default abstract class BaseRepository<Interface, Entity>
  implements IRepository<Interface, Entity> {
  protected repository: Repository<Entity>;

  /**
   * Instantiate a Repository.
   *
   * @param {Entity} entity The Entity this repository handles.
   * @protected
   */
  protected constructor(entity: ClassType<Entity>) {
    this.repository = getRepository(entity);
  }

  /**
   * Creates a new Entity by using the given interface.
   *
   * @param {Interface} data
   */
  async create(data: Interface): Promise<Entity> {
    return this.repository.save(this.repository.create(data));
  }

  /**
   * Deletes a entity, using the given ID.
   *
   * @param {string | number} id The value of the entity's primary key.
   */
  async delete(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  /**
   * Find all entities that matches the given constraints.
   *
   * @param {FindManyOptions<Entity>>} options Applies 'where' clauses to the query.
   */
  async find(options: FindManyOptions<Entity> = {}): Promise<Entity[]> {
    return this.repository.find(options);
  }

  /**
   * Find a single Entity, by it's ID.
   * If company is provided, will also filter by the company's ID.
   *
   * @param {string|number} id The Entity's ID.
   * @param {string|number} [company] If present, the company that the entity must belongs to.
   */
  async findById(
    id: string | number,
    company?: string | number,
  ): Promise<Entity | undefined> {
    return this.repository.findOne({
      where: { id, ...(company && { company }) },
    });
  }

  /**
   * Saves a single Entity to the database.
   *
   * @param {Interface} data
   */
  save(data: Interface): Promise<Entity> {
    return this.repository.save(data);
  }

  /**
   * Soft Deletes the given Entity, by setting the current date
   * to the 'deleted_at' column of the Entity.
   *
   * Note: The Entity is searched through the given ID.
   *
   * @param {string|number} id
   */
  softDelete(id: string | number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  /**
   * Soft Deletes the given Entity, by setting the current date
   * to the 'deleted_at' column of the Entity.
   *
   * Note: Unlike softDelete, that soft deletes by using the ID, softRemove
   * expects an instance of the Entity to be deleted. It also has the
   * side-effect of deleting related models, if they're present in the given
   * instance.
   *
   * @param {DeepPartial<Entity>} entity
   */
  softRemove(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.softRemove(entity);
  }

  /**
   * Update a Entity, given it's ID, by the provided data parameter.
   *
   * @param {string | number} id
   * @param {Interface} data
   */
  update(id: string | number, data: Interface): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }
}
