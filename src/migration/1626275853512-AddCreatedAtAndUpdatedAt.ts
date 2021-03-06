import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';
import {assertWithStatement} from '@babel/types';


let tables = ['users', 'posts', 'comments'];

export class AddCreatedAtAndUpdatedAt1626275853512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let table of tables) {
      await queryRunner.addColumns(table, [
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          })
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let table of tables) {
      if (await queryRunner.hasTable(table)){
        await queryRunner.dropColumn(table, 'createdAt');
        await queryRunner.dropColumn(table, 'updatedAt');
      }
    }
  }

}
