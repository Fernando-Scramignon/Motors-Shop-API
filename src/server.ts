import app from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

async function init() {
    const PORT = process.env.PORT || 3001;

    await AppDataSource.initialize().catch((error) =>
        console.error("Error during data source initialization", error)
    );

    app.listen(PORT, () => {
        console.log(`App is running at port ${PORT}!`);
    });
}
init();
