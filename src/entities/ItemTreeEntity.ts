import { IItemDTO } from '@dtos/index';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent, OneToMany,
} from 'typeorm';
import {JoinColumn} from "typeorm/browser";

@Entity('general_item')
@Tree('closure-table', {
  closureTableName: 'general_item', // puts "_closure" in generated table
  ancestorColumnName: column => `${column.propertyName}_general_item`,
  descendantColumnName: column =>
    `${column.propertyName}_general_item_component`,
})
export default class ItemTreeEntity implements IItemDTO {
  @PrimaryGeneratedColumn({ name: 'id_general_item' })
  id: number;

  @OneToMany(() => ItemTreeEntity, item => item.id)
  @JoinColumn({ name: 'id_general_item_component' })
  itemId: this[];

  @Column({ name: 'description' })
  description: string;

  @TreeParent()
  item: this;

  @TreeChildren()
  itemComponent: this[];
}
