import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  getTreeRepository,
  TreeRepository,
  UpdateResult,
} from 'typeorm';
import {ITreeRepository} from "@providers/typeorm";
import ClassType from "@helpers/classType";

/**
 * @template Interface
 * @template EntityTree
 * @author Eric Ambiel
 */
export default abstract class BaseTreeRepository<Interface, EntityTree>
  implements ITreeRepository<Interface, EntityTree> {
  protected treeRepository: TreeRepository<EntityTree>;

  /**
   * Instantiate a Repository.
   *
   * @param {EntityTree} entityTree The EntityTree this repository handles.
   * @protected
   */
  protected constructor(
    entityTree: ClassType<EntityTree>,
  ) {
    this.treeRepository = getTreeRepository(entityTree);
  }

  /**
   * Creates a new EntityTree by using the given interface.
   *
   * @param {Interface} data
   */
  async create(data: Interface): Promise<EntityTree> {
    return this.treeRepository.save(this.treeRepository.create(data));
  }

  /**
   * Deletes a entityTree, using the given ID.
   *
   * @param {string | number} id The value of the entityTree's primary key.
   */
  async delete(id: string | number): Promise<DeleteResult> {
    return this.treeRepository.delete(id);
  }

  /**
   * Find all entities that matches the given constraints.
   *
   * @param {FindManyOptions<EntityTree>>} options Applies 'where' clauses to the query.
   */
  async find(options: FindManyOptions<EntityTree> = {}): Promise<EntityTree[]> {
    return this.treeRepository.find(options);
  }

  /**
   * Find a single EntityTree, by it's ID.
   * If company is provided, will also filter by the company's ID.
   *
   * @param {string|number} id The EntityTree's ID.
   * @param {string|number} [company] If present, the company that the entityTree must belongs to.
   */
  async findById(
    id: string | number,
    company?: string | number,
  ): Promise<EntityTree | undefined> {
    return this.treeRepository.findOne({
      where: { id, ...(company && { company }) },
    });
  }

  /**
   * Gets complete trees for all roots in the table.
   */
  async findTrees(): Promise<EntityTree[]> {
    return this.treeRepository.findTrees();
  }

  /**
   * Saves a single EntityTree to the database.
   *
   * @param {Interface} data
   */
  save(data: Interface): Promise<EntityTree> {
    return this.treeRepository.save(data);
  }

  /**
   * Soft Deletes the given EntityTree, by setting the current date
   * to the 'deleted_at' column of the EntityTree.
   *
   * Note: The EntityTree is searched through the given ID.
   *
   * @param {string|number} id
   */
  softDelete(id: string | number): Promise<UpdateResult> {
    return this.treeRepository.softDelete(id);
  }

  /**
   * Soft Deletes the given EntityTree, by setting the current date
   * to the 'deleted_at' column of the EntityTree.
   *
   * Note: Unlike softDelete, that soft deletes by using the ID, softRemove
   * expects an instance of the EntityTree to be deleted. It also has the
   * side-effect of deleting related models, if they're present in the given
   * instance.
   *
   * @param {DeepPartial<EntityTree>} entityTree
   */
  softRemove(entityTree: DeepPartial<EntityTree>): Promise<EntityTree> {
    return this.treeRepository.softRemove(entityTree);
  }

  /**
   * Update a EntityTree, given it's ID, by the provided data parameter.
   *
   * @param {string | number} id
   * @param {Interface} data
   */
  update(id: string | number, data: Interface): Promise<UpdateResult> {
    return this.treeRepository.update(id, data);
  }
}
