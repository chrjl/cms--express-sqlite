import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.join(process.cwd(), '.db/db.sqlite');
const db = new sqlite3.Database(dbPath);

export default db;
