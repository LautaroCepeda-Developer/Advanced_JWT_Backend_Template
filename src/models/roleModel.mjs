import db from '../db/auth_db.mjs';

export const getRoles = async () => {
    const stmt = db.prepare('SELECT * FROM roles');
    return stmt.all();
};

export const getRoleById = async (id) => {
    const stmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    return stmt.get(id);
};

export const getRoleByName = async (name) => {
    const stmt = db.prepare('SELECT * FROM roles WHERE name = ?');
    return stmt.get(name);
};

export const createRole = async ({ name, description, level }) => {
    const stmt = db.prepare(
        'INSERT INTO roles (name, description, level) VALUES (?,?,?)'
    );

    return stmt.run(name, description, level);
};

export const updateRoleById = async ({
    id,
    newName,
    newDescription,
    newLevel,
}) => {
    const stmt = db.prepare(
        'UPDATE roles SET name = ?, description = ?, level = ? WHERE id = ?'
    );
    return stmt.run(newName, newDescription, newLevel, id);
};

export const updateRoleByName = async ({
    name,
    newName,
    newDescription,
    newLevel,
}) => {
    const stmt = db.prepare(
        'UPDATE roles SET name = ?, description = ?, level = ? WHERE name = ?'
    );
    return stmt.run(newName, newDescription, newLevel, name);
};

export const deleteRoleById = async (id) => {
    const stmt = db.prepare('DELETE FROM roles WHERE id = ?');
    return stmt.run(id);
};

export const deleteRoleByName = async (name) => {
    const stmt = db.prepare('DELETE FROM roles WHERE name = ?');
    return stmt.run(name);
};
