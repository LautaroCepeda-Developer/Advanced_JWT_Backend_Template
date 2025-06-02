import { Database } from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Compatibility with EcmaScript Modules (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, './auth.db');
const db = new Database(dbPath);

db.exec('PRAGMA foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENTE
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        level INTEGER NOT NULL
    )
`);

db.exec(`
    INSERT OR IGNORE INTO ROLES(id, name, description, level) VALUES
    (1, 'superadmin', 'Full access', 1),
    (2, 'admin', 'Management', 5),
    (3, 'user', 'Common user', 100)
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role_id INTEGER NOT NULL default 3, --id of 'user' role
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id)
    )
`);

export default db;
