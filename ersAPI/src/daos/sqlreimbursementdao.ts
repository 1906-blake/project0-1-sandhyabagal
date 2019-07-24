import { PoolClient } from 'pg';
import { connectionPool } from '../utils/connectionutil';
import { convertSqlReimbursement } from '../utils/reimbursementconverter';
import { Reimbursement } from '../models/reimbursement';

export async function findReimbursementByStatusId(statusid: number): Promise<Reimbursement[]>  {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status, rt.retype, u.username, u.pass, u.firstname, u.lastname, u.email, ru.*
        FROM reimbursement r
            JOIN reimbursement_status rs USING (statusid)
            JOIN reimbursement_type rt USING (typeid)
            JOIN api_user u ON (author = userid)
            JOIN role_user ru ON (u.roleid = ru.roleid)
        WHERE statusid = $1
            `;
        const result = await client.query(queryString, [statusid]);
        return result.rows.map(convertSqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementByAuthor(userid: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status, rt.retype, u.username, u.pass, u.firstname, u.lastname, u.email, ru.*
        FROM reimbursement r
            JOIN reimbursement_status rs USING (statusid)
            JOIN reimbursement_type rt USING (typeid)
            JOIN api_user u ON (author = userid)
            JOIN role_user ru ON (u.roleid = ru.roleid)
        WHERE statusid = $1
            `;
        const result = await client.query(queryString, [userid]);
        return result.rows.map(convertSqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementById(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status, rt.retype, u.username, u.pass, u.firstname, u.lastname, u.email, ru.*
        FROM reimbursement r
            JOIN reimbursement_status rs USING (statusid)
            JOIN reimbursement_type rt USING (typeid)
            JOIN api_user u ON (author = userid)
            JOIN role_user ru ON (u.roleid = ru.roleid)
        WHERE statusid = $1
            `;
        const result = await client.query(queryString, [userid]);
        const sqlReimbursement = result.rows[0];
        return convertSqlReimbursement(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            INSERT INTO reimbursement (author, amount, resolver, datesubmitted, dateresolved, description, statusid, typeid)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING reimbursementid
        `;
        const result =  [reimbursement.author.userId, reimbursement.amount, reimbursement.resolver && reimbursement.resolver.userid,
        reimbursement.datesubmitted, reimbursement.dateresolved, reimbursement.description, reimbursement.status.statusid, reimbursement.type.typeid];

        const newid = await client.query(queryString, result);
        const sqlReimbursement = newid.rows[0].reimbursementid;
        const final = await findReimbursementById(sqlReimbursement);
        return final;

    } catch (error) {
        console.log(error);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const oldReimbursement = await findReimbursementById(reimbursement.reimbursementid);
    if (!oldReimbursement) {
        return undefined;
    }
    reimbursement = {
        ...oldReimbursement,
        ...reimbursement
    };
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            UPDATE reimbursement SET author = $1, amount = $2, resolver = $3, datesubmitted = $4, dateresolved = $5,
                                    description = $6, statusid = $7, typeid = $8
                WHERE reimbursementid = $9
        `;
        const constraints = [reimbursement.author.userid, reimbursement.amount, reimbursement.resolver && reimbursement.resolver.userid,
            reimbursement.datesubmitted, reimbursement.dateresolved, reimbursement.description, reimbursement.status,
            reimbursement.type && reimbursement.type, reimbursement.reimbursementid];
        await client.query(queryString, constraints);

        const sqlReimbursement = await findReimbursementById(reimbursement.reimbursementid);
        return sqlReimbursement;
    } catch (error) {
        console.log(error);
       // return undefined;
    } finally {
        client && client.release();
    }
    return undefined;
}
   