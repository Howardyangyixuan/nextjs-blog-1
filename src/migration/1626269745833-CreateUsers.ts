import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsers1626269745833 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'passwordDigest',
            type: 'varchar'
          }
        ]
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
