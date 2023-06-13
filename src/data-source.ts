import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

function dataSourceConfig(): DataSourceOptions {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/**.{ts,js}"
    );

    if (process.env.NODE_ENV === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    const databaseURL = process.env.DATABASE_URL;

    if (databaseURL) {
        return {
            type: "postgres",
            url: databaseURL,
            synchronize: false,
            logging: true,
            migrations: [migrationsPath],
            entities: [entitiesPath],
        };
    }
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
}

export const AppDataSource = new DataSource(dataSourceConfig());
