import { Reimbursement } from "../models/reimbursement";
// import User from "../models/user";
// import { Role } from "../models/role";
// import { ReimbursementStatus } from "../models/reimbursementstatus";
// import { ReimbursementType } from "../models/reimbursementtype";


// export function convertSqlReimbursement(row: any) {
//     return new Reimbursement(row.reimbursementid, 
//         new User(row.author, row.username, row.pass, row.firstname, row.lastname, row.email, 
//             new Role(row.roleid, row.userrole)), row.amount, row.datesubmitted, row.dateresolved, row.description, row.resolver,
//             new ReimbursementStatus(row.statusid, row.status), 
//             new ReimbursementType(row.typeid, row.retype));
// }

export function convertSqlReimbursement(row: any) {
    return new Reimbursement(row.reimbursementid, row.username, row.amount, row.datesubmitted, row.dateresolved, row.description, row.resolver, row.status, row.retype);
}

export function convertSqlReimbursement2(row: any) {
    return new Reimbursement(row.reimbursementid, row.username, row.amount, row.datesubmitted, row.dateresolved, row.description, row.res_username, row.status, row.retype);
}