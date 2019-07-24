import { User } from './user';
import { ReimbursementStatus } from './reimbursementstatus';
import { ReimbursementType } from './reimbursementtype';

export class Reimbursement {
    constructor(
        public reimbursementid: number, // primary key
        public author: User,  // foreign key -> User, not null
        public amount: number,  // not null
        public datesubmitted: number, // not null
        public dateresolved: number,
        public description: string, // not null
        public resolver: number, // foreign key -> User
        public status: ReimbursementStatus, // foreign key -> ReimbursementStatus, not null
        public type: ReimbursementType // foreign key -> ReimbursementType
    ) {}
}