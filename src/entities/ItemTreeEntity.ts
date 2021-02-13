import { IItemDTO } from '@dtos/index';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent
} from 'typeorm';

@Entity('general_item')
@Tree('closure-table', {
  closureTableName: 'general_item_structural_tree', // puts "_closure" automatically at final table name - Default NameStrategy
  ancestorColumnName: (column) => column.propertyName,
  descendantColumnName: (column) => column.propertyName + '_child',
})
export default class ItemTreeEntity implements IItemDTO {
  @PrimaryGeneratedColumn()
  id_general_item: number; // Can't use property @PrimaryGeneratedColumn({ name: 'id_general_item' }), BUG!!!

  @Column({ name: 'description' })
  description: string;

  @TreeParent()
  parent: this;

  @TreeChildren()
  children: this[];
}

// Não é possível usar { name: 'id_general_item' } em chave primaria, typeORM apresenta bug.
// Sem essa propriedade acima citada é usado nome do objeto para encontrar no banco campo a ser localizado.
// Nomes dos objetos @TreeParent e @TreeChildren são concatenados ao nome do objeto @PrimaryGeneratedColumn para formar nome de FKs no BD.
// Esta sendo usado NameStrategy alternativo (snack_case) para formação e localização do nome de campos nas tabelas, nomes dos objetos são concatenados, e a cada palavra é posto um "_".
