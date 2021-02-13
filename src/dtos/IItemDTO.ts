export default interface IItemDTO {
  id?: this | number;
  description: string;
  itemParent?: this;
  itemChildren?: this[];
}
