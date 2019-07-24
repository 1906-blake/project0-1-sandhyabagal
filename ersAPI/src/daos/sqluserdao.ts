import { connectionPool } from '../utils/connectionutil';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../utils/userconverter';
import User from '../models/user';
//import { authMiddleware } from '../middleware/authmiddleware';

// login
export async function findByUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT api_user.*, role_user.userrole FROM api_user
        LEFT JOIN role_user
        ON api_user.roleid = role_user.roleid
                WHERE username = $1 AND pass = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0]; // there should really only be 1 row at best
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

// find user
export async function findAll() {
    //authMiddleware('Admin', 'Finance Manager');
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM api_user');
        // convert result from sql object to js object
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    return undefined;
    } finally {
        client && client.release();
    }
    console.log('found all');
    
}

// user by Id
export async function findById(userid: number) {
    console.log('finding user by id: ' + userid);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query(`SELECT api_user.*, role_user.userrole FROM api_user
        LEFT JOIN role_user
        ON api_user.roleid = role_user.roleid 
        WHERE userid = $1`, [userid]);
        const sqlUser = result.rows[0];
        //console.log(sqlUser);
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
   // return undefined;
    } finally {
        client && client.release();
    }
   return undefined;
}

export async function save(user: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO app_user (username, pass, firstname, lastname, email, roleid)
            VALUES 	($1, $2, $3, $4, $5, $6, $7)
            RETURNING userid
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.roleid];
        const result = await client.query(queryString, params);
        return result.rows[0].userid;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function updateUser(user: User) {
    const oldUser = await findById(user.userid);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            UPDATE api_user 
            SET username = $1, pass = $2, first_name = $3, last_name = $4, email = $5, roleid = $6
            WHERE userid = $7
            RETURNING *
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.roleid, user.userid];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    console.log('found all');
  //  return undefined;
}
