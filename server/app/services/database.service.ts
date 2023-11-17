import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
require('dotenv').config();

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    host: process.env.DB_HOST,
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
}
