import {MigrationInterface, QueryRunner} from "typeorm";

export class InitailCreateTables1613188707925 implements MigrationInterface {
    name = 'InitailCreateTables1613188707925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `general_item` (`id_general_item` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `id_general_item_parent` int NULL, PRIMARY KEY (`id_general_item`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `general_item_structural_tree_closure` (`id_general_item` int NOT NULL, `id_general_item_child` int NOT NULL, INDEX `IDX_8c0105ed2ad295ee896044d91f` (`id_general_item`), INDEX `IDX_e00caf54fd506c0e0a4b3ca8a4` (`id_general_item_child`), PRIMARY KEY (`id_general_item`, `id_general_item_child`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `general_item` ADD CONSTRAINT `FK_036d3a90097e6af07b2d67bab54` FOREIGN KEY (`id_general_item_parent`) REFERENCES `general_item`(`id_general_item`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `general_item_structural_tree_closure` ADD CONSTRAINT `FK_8c0105ed2ad295ee896044d91f2` FOREIGN KEY (`id_general_item`) REFERENCES `general_item`(`id_general_item`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `general_item_structural_tree_closure` ADD CONSTRAINT `FK_e00caf54fd506c0e0a4b3ca8a40` FOREIGN KEY (`id_general_item_child`) REFERENCES `general_item`(`id_general_item`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `general_item_structural_tree_closure` DROP FOREIGN KEY `FK_e00caf54fd506c0e0a4b3ca8a40`");
        await queryRunner.query("ALTER TABLE `general_item_structural_tree_closure` DROP FOREIGN KEY `FK_8c0105ed2ad295ee896044d91f2`");
        await queryRunner.query("ALTER TABLE `general_item` DROP FOREIGN KEY `FK_036d3a90097e6af07b2d67bab54`");
        await queryRunner.query("DROP INDEX `IDX_e00caf54fd506c0e0a4b3ca8a4` ON `general_item_structural_tree_closure`");
        await queryRunner.query("DROP INDEX `IDX_8c0105ed2ad295ee896044d91f` ON `general_item_structural_tree_closure`");
        await queryRunner.query("DROP TABLE `general_item_structural_tree_closure`");
        await queryRunner.query("DROP TABLE `general_item`");
    }

}
