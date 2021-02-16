import { getTreeRepository, TreeRepository } from 'typeorm';
import { ITreeRepository } from '@providers/typeorm';
import ClassType from '@helpers/classType';

/**
 * @template Interface
 * @template EntityTree
 * @author Eric Ambiel
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default abstract class BaseTreeRepository<Interface, EntityTree>
  // extends BaseRepository<Interface, EntityTree>
  implements ITreeRepository<EntityTree> {
  public treeRepository: TreeRepository<EntityTree>;

  /**
   * Instantiate a Repository.
   *
   * @param {EntityTree} entityTree The EntityTree this repository handles.
   * @protected
   */
  protected constructor(entityTree: ClassType<EntityTree>) {
    // super(entityTree);
    this.treeRepository = getTreeRepository(entityTree);
  }

  // /**
  //  * Gets complete trees for all roots in the table.
  //  */
  // async findTrees(): Promise<EntityTree[]> {
  //   return this.treeRepository.findTrees();
  // }
}
