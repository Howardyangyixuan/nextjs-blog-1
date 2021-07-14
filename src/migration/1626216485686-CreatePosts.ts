import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePost1626216485686 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //升级数据库
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'authorId',
          type: 'int',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }

}
