import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function connectDb() {
    db = await open({
        filename: "./db.sqlite3",
        driver: sqlite3.Database
    });

    console.log("🟢 La base de datos se ha conectado");
    return db;
}

export function getDB() {
    if (!db) {
        throw new Error("La base de datos no está conectada");
    }
    return db;
}