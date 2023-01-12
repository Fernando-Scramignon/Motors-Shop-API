import { MigrationInterface, QueryRunner } from "typeorm";

export class complementNullable1673445372938 implements MigrationInterface {
    name = 'complementNullable1673445372938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "complement" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "complement" SET NOT NULL`);
    }

}
