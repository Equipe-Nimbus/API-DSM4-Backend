import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DB_URL;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PORT = Number(process.env.DB_PORT);
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const PgDataSource = new DataSource({

    //DB online elephantSQL
    //database: 'bqlvykqu',
    //url:DB_URL,

    //DB Local
    database: DB_NAME,
    host: DB_HOST,
    username: DB_USER,
    port: DB_PORT,
    password: POSTGRES_PASSWORD,

    type: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});

PgDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default PgDataSource;