CREATE TABLE api_user ( -- track of users information
	userid SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	pass TEXT NOT NULL, -- password
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	email TEXT NOT NULL,
	roleid INT REFERENCES role_user(roleid)
);

CREATE TABLE role_user ( -- used to track what permissions a user has
	roleid SERIAL PRIMARY KEY,
	userrole TEXT UNIQUE NOT NULL
);

CREATE TABLE reimbursement_status ( -- used to track the status of reimbursements
	statusid SERIAL PRIMARY KEY,
	status TEXT UNIQUE NOT NULL
); -- possibilities: pending, approved, or denied

CREATE TABLE reimbursement_type ( -- used to track what kind of reimbursement is being submitted.
	typeid SERIAL PRIMARY KEY,
	retype TEXT UNIQUE NOT NULL
); -- possibilities: lodging, travel, food, other

CREATE TABLE reimbursement ( -- used to represent a single reimbursement that an employee would submit
	reimbursementid SERIAL PRIMARY KEY,
	author INT REFERENCES api_user(userid) NOT NULL,
	amount INT NOT NULL,
	dateSubmitted INT NOT NULL,
	dateResolved INT,
	description TEXT NOT NULL,
	resolver INT REFERENCES api_user(userid),
	status INT REFERENCES reimbursement_status(statusid) NOT NULL,
	type INT REFERENCES reimbursement_type(typeid)
);	
