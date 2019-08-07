import { PoolClient } from 'pg';
import { connectionPool } from '../utils/connectionutil';
import { convertSqlReimbursement } from '../utils/reimbursementconverter';
import { convertSqlReimbursement2 } from '../utils/reimbursementconverter';
import { Reimbursement } from '../models/reimbursement';

export async function findReimbursementByStatusId(statusid: number)  {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status, rt.retype, u.username, u.pass, u.firstname, u.lastname, u.email, ru.*
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs ON r.status = rs.statusid
            LEFT JOIN reimbursement_type rt ON r.type = rt.typeid
            LEFT JOIN api_user u ON (author = userid)
            LEFT JOIN role_user ru ON (u.roleid = ru.roleid)
        WHERE rs.statusid = $1
            `;
        const result = await client.query(queryString, [statusid]);

        console.log(result.rows);
        return result.rows.map(convertSqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementByAuthor(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status, rt.retype, u.username, u.pass, u.firstname, u.lastname, u.email, ru.*
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs ON r.status = rs.statusid
            LEFT JOIN reimbursement_type rt ON r.type = rt.typeid
            LEFT JOIN api_user u ON (author = userid)
            LEFT JOIN role_user ru ON (u.roleid = ru.roleid)
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
    SELECT *
	FROM reimbursement r
	JOIN reimbursement_type t ON (r.type = t.typeid)
	JOIN reimbursement_status s ON (r.status = s.statusid)
	INNER JOIN api_user u ON (r.author = u.userid)
    LEFT JOIN res_view v ON (r.resolver = v.res_id)
	WHERE reimbursementid = $1
            `;
        const result = await client.query(queryString, [userid]);
        const sqlReimbursement = result.rows[0];
        return convertSqlReimbursement2(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function createReimbursement(reimbursement: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            INSERT INTO reimbursement (author, amount, resolver, datesubmitted, description, status, type)
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING reimbursementid
        `;
        const result =  [reimbursement.author, reimbursement.amount, reimbursement.resolver && reimbursement.resolver,
        reimbursement.datesubmitted, reimbursement.description, reimbursement.status, reimbursement.type];

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

export async function updateReimbursement(reimbursement: Reimbursement) {
    console.log('1');
    const oldReimbursement = await findReimbursementById(reimbursement.reimbursementid);
    console.log('2');
    console.log(oldReimbursement);
    if (!oldReimbursement) {
        console.log('3');
        return undefined;
    }
    reimbursement = {
        ...oldReimbursement,
        ...reimbursement
    };
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log('does it work?');
        const queryString = `
            UPDATE reimbursement SET author = $1, amount = $2, datesubmitted = $3, dateresolved = $4,
                description = $5, resolver = $6, status = $7, type = $8
            WHERE reimbursementid = $9
            RETURNING *
        `;


        const constraints = [reimbursement.author, reimbursement.amount, 
            reimbursement.datesubmitted, reimbursement.dateresolved, reimbursement.description, reimbursement.resolver, reimbursement.status,
            reimbursement.type, reimbursement.reimbursementid];
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
   