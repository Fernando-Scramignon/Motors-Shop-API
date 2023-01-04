import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductUserRelation1672780236486 implements MigrationInterface {
    name = "ProductUserRelation1672780236486";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "products" ADD "userId" uuid NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`
        );
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "userId"`);
    }
}
