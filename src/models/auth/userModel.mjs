import db from '../../db/auth_db.mjs';

// STMT = SQL Statement

export const countUsers = async () => {
    const stmt = db.prepare(`SELECT COUNT(*) as total FROM users`);
    const result = stmt.get();
    return result.total;
};

const roleJoinPart = `
    r.name AS role_name,
    r.level AS role_level
    FROM users u
    JOIN roles r 
    ON u.role_id = r.id
`;

export const getUsers = async (limit = 10, offset = 0) => {
    const stmt = db.prepare(`
        SELECT 
        u.*,
        ${roleJoinPart}
        ORDER BY u.id
        LIMIT ? OFFSET ?
        `);
    return stmt.all(limit, offset);
};

export const getUserById = async (id) => {
    const stmt = db.prepare(`
        SELECT u.*,
        ${roleJoinPart}
        WHERE id = ?
    `);

    return stmt.get(id);
};

export const getUserByUsername = async (username) => {
    const stmt = db.prepare(`
        SELECT u.*,
        ${roleJoinPart}
        WHERE username = ?`);
    return stmt.get(username);
};

export const getUserByEmail = async (email) => {
    const stmt = db.prepare(`SELECT
        u.*,
        ${roleJoinPart}
        WHERE email = ?`);
    return stmt.get(email);
};

// ---- CREATE
export const createUser = async ({
    fullname,
    email,
    username,
    hashedPassword,
    roleId = 3,
}) => {
    const stmt = db.prepare(`
        INSERT INTO users (fullname, email, username, password, role_id)
        VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(fullname, email, username, hashedPassword, roleId);
};

// ---- UPDATE
export const updateUserById = async ({
    id,
    newFullname,
    newEmail,
    newUsername,
    newHashedPassword,
    newRoleId,
}) => {
    const stmt = db.prepare(
        'UPDATE users SET fullname = ?, email = ?, username = ?, password = ?, role_id = ? WHERE id = ?'
    );

    stmt.run(
        newFullname,
        newEmail,
        newUsername,
        newHashedPassword,
        newRoleId,
        id
    );
};

export const updateUserByUsername = async ({
    username,
    newFullname,
    newEmail,
    newUsername,
    newHashedPassword,
    newRoleId,
}) => {
    const stmt = db.prepare(
        'UPDATE users SET fullname = ?, email = ?, username = ?, password = ?, role_id = ? WHERE username = ?'
    );

    stmt.run(
        newFullname,
        newEmail,
        newUsername,
        newHashedPassword,
        newRoleId,
        username
    );
};

export const updateUserByEmail = async ({
    email,
    newFullname,
    newEmail,
    newUsername,
    newHashedPassword,
    newRoleId,
}) => {
    const stmt = db.prepare(
        'UPDATE users SET fullname = ?, email = ?, username = ?, password = ?, role_id = ? WHERE email = ?'
    );
    stmt.run(
        newFullname,
        newEmail,
        newUsername,
        newHashedPassword,
        newRoleId,
        email
    );
};

// ---- DELETE
export const deleteUserById = async (id) => {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id);
};

export const deleteUserByUsername = async (username) => {
    const stmt = db.prepare('DELETE FROM users WHERE username = ?');
    stmt.run(username);
};

export const deleteUserByEmail = async (email) => {
    const stmt = db.prepare('DELETE FROM users WHERE email = ?');
    stmt.run(email);
};
