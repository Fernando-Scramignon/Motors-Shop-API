import { MigrationInterface, QueryRunner } from "typeorm";

export class firstEntities1671456405956 implements MigrationInterface {
    name = 'firstEntities1671456405956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL, "title" character varying(100) NOT NULL, "year" integer NOT NULL, "km" integer NOT NULL, "price" integer NOT NULL, "description" character varying(256) NOT NULL, "vehicle_type" character varying NOT NULL, "announcement_type" character varying NOT NULL, "published" boolean NOT NULL DEFAULT false, "cover_image" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL, "url" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
