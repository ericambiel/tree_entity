import ItemTreeEntity from "@entities/ItemTreeEntity";

export default interface IItemRepository
  //extends ITreeRepository<IItemDTO, ItemTreeEntity> {
  {
  findTrees(): Promise<ItemTreeEntity[]>;
}
