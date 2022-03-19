import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccessToken1647674697062 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Token ADD COLUMN accessToken VARCHAR(250) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Token DROP COLUMN accessToken');
    }
}
