export class Role {
    constructor(
        public roleid: number, // primary key
        public userrole: string // not null, unique
    ) {}
}