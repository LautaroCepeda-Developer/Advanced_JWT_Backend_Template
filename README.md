## Purpose of the project
<p>This project was created to learn about authentication mechanisms, in this case JWT logins and signed cookies for security, role-based path protection and access levels.

Besides being able to use it as a template for future more complex projects and to demonstrate my skills in modular architectures where I separate responsibilities in multiple layers to improve scalability and maintenance of the project.</p>

## What I learned
<p>I learned how to manage user data securely through cookies and JsonWebToken, being able to perform logins and logouts, as well as how to protect endpoints based on different conditions such as the user's role or access level using middlewares.</p>

## What improvements could be implemented
<p>I would possibly add an in-memory database like Redis, to create a JWT blacklist when a user logs out, to avoid information leakage in a hypothetical case that the token is obtained. (These records would have the same expiration as the tokens, so that once they expire, the record is deleted).

I also use an in-memory database to cache the roles as they may not be as changeable and would save resources by reducing the number of accesses to the main database.

I would change the database where the users are located for a more robust one with more security options and better concurrency support such as PostgreSQL, MySQL, MSQLServer, etc.</p>

## Technologies used
* Express to create the API.
* GIT for the version control.
* Hoppscotch to test the endpoints.
* NodeJS to run the project and install the dependencies.
* SQLite as Database.

### Libraries and Modules used.
* BCrypt to hash the passwords.
* BetterSQLite 3 to be able to access and perform queries in the database.
* CookieParser to manage the cookies easily.
* CORS to limit the domains and routes from which the API can be accessed.
* DotENV to manage the enviroment variables.
* JsonWebToken to easily and securely manage user data and sessions.
* ZOD V4 to create schemas, keep code cleaner, and facilitate data validation.
* Ocurrences Module by Victornpb for count occurrences of a substring in a string (to perform some validations in the data).

## Features
* Scalable architecture.
* API Designed using the REST principles.
* CRUD on all routes with its corresponding validations and restrictions.
* Data validation using schemas.
* Password Hashing.
* Login with signed cookies and JWT.
* Route protection using signed cookies and JWT validation middleware.
* Access restriction based on user role or/and level.

#### Environtment File example (ENV)
```ENV
PORT=3000
JWT_SECRET=JWT_SUPER_SECRET_KEY
COOKIE_SECRET=COOKIE_SUPER_SECRET_KEY
CORS_ORIGIN=http://localhost:3000
```
<b>Explanation:</b><br>
* <b>PORT:</b> Port on which the API will listen.
* <b>JWT_SECRET:</b> Secret used to sign and decode json web tokens (JWT).<br>
* <b>COOKIE_SECRET:</b> Secret used to sign and decode cookies.<br>
* <b>CORS_ORIGIN:</b> Authorized domain(s) to make API requests. This can be a single domain (e.g., `http://localhost:3000`), multiple domains separated by commas, or `*` to allow all origins (not recommended for production due to security reasons).
* See [config.mjs](https://github.com/LautaroCepeda-Developer/Advanced_JWT_Backend_Template/blob/9592acace27a64d7ccab794e0e665feb34b92dde/src/config/config.mjs) to add more ENV vars.

#### Entity Relationship Diagram (ERD)
![ERD](https://github.com/user-attachments/assets/aa74cd3e-2670-45b2-bd1e-dabc95d255fb)<br>
To view the SQL code used to create the tables and the constraints see [auth_db.mjs](https://github.com/LautaroCepeda-Developer/Advanced_JWT_Backend_Template/blob/53c2527137b7a1c797fbc4842eaa308d18e63cb3/src/db/auth_db.mjs)
#### Trigger to auto update the field 'updated_at' of the last row updated in the 'users' table.
```SQL
DROP TRIGGER "main"."update_users_updated_at";
CREATE TRIGGER update_users_updated_at
    AFTER UPDATE ON users
    FOR EACH ROW
    BEGIN
        UPDATE users
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.id;
    END
```
> [!NOTE]  
> SQLite does not have the native function to automatically update a field after an update, as would be the case with MySQL when defining a table and putting 'ON UPDATE CURRENT_TIMESTAMP' in the corresponding field, that is the reason why a trigger is used in this case.

