import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'db/db.sqlite3');
const db = new Database(dbPath);

export default db;
