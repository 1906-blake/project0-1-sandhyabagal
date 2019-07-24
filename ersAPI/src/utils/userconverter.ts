import User from '../models/user';

export function convertSqlUser(row: any) {
    return new User(row.userid, row.username, row.pass, row.firstname, row.lastname, row.email, row.roleid);
}