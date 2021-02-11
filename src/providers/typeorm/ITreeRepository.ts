import IRepository from '@providers/typeorm/IRepository';

/**
 * @template Interface
 * @template EntityTree
 */
export default interface ITreeRepository<Interface, EntityTree>
  extends IRepository<Interface, EntityTree> {
  findTrees(): Promise<EntityTree[]>;
}
