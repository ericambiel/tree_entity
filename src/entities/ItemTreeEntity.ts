import { IItemDTO } from '@dtos/index';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent, OneToMany, ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('general_item')
@Tree('closure-table', {
  closureTableName: 'general_item_structural_tree', // puts "_closure" in generated table
  ancestorColumnName: () => 'id_general_item',
  descendantColumnName: () => 'id_general_item_child',
})
export default class ItemTreeEntity implements IItemDTO {
  @PrimaryGeneratedColumn({ name: 'id_general_item' })
  id: number;

  @Column({ name: 'description' })
  description: string;

  @TreeParent()
  @JoinColumn({ name: 'id_general_item_parent', referencedColumnName: 'id' })
  itemParent: this;

  @TreeChildren()
  itemChildren: this[];
}
