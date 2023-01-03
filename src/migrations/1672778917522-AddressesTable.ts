import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressesTable1672778917522 implements MigrationInterface {
    name = "AddressesTable1672778917522";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "addresses" ("id" character varying NOT NULL, "cep" character varying(9) NOT NULL, "state" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(10) NOT NULL, "complement" character varying NOT NULL, "userId" character varying, CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`
        );
        await queryRunner.query(
            `ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`
        );
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }
}
