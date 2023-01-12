import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserEntity1672750454646 implements MigrationInterface {
    name = 'createUserEntity1672750454646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(256) NOT NULL, "name" character varying(100) NOT NULL, "cpf" character varying(14) NOT NULL, "phone" character varying(14) NOT NULL, "birthdate" date NOT NULL, "description" character varying(300) NOT NULL, "isAdvertiser" boolean NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
