function setApproved() {
    viewByStatus('1');
};
function setPending() {
    viewByStatus('2');
};
function setDenied() {
    viewByStatus('3');
};
function sandyReimb() {
    viewReimb('1');
}
function alReimb() {
    viewReimb('2');
}
function botReimb() {
    viewReimb('3');
}
const tableContainer = document.getElementById('display-reimb');
const reimbody = tableContainer.childNodes[3];

async function viewByStatus(statusid) { //view reimbursements by status endpoint
    try {
    const resp = await fetch(`http://localhost:8012/reimbursements/status/${statusid}`, {
        method: 'GET',
        credentials: 'include'
    });
    const reimbursements = await resp.json();
    console.log(reimbursements);
    reimbody.innerHTML = '';
    reimbursements.forEach(addReimbursement);
    } catch (err) {
        console.log(err);
    }
}

async function viewReimbursements() { 
    const resp = await fetch(`http://localhost:8012/reimbursements/author/userid/${1}`, {
        credentials: 'include'
    });

    const reimbursement = await resp.json();
    console.log(reimbursement);
    reimbursement.forEach(addReimbursement);
}

async function viewReimb(userid) { //view reimbursements by employee endpoint
    try {
    const resp = await fetch(`http://localhost:8012/reimbursements/author/userid/${userid}`, {
        method: 'GET',
        credentials: 'include'
    });
    const reimbursements = await resp.json();
    console.log(reimbursements);
    reimbody.innerHTML = '';
    reimbursements.forEach(addReimbursement);
    } catch (err) {
        console.log(err);
    }
}

function addReimbursement(reimbursement) {
    if(!reimbursement) {
        return;
    }

    const row = document.createElement('tr');
    row.setAttribute('data-id', reimbursement.reimbursementid);
    reimbody.appendChild(row);

    const author = document.createElement('td');
    author.innerText = reimbursement.author;
    row.appendChild(author);

    const amount = document.createElement('td');
    amount.innerText = reimbursement.amount;
    row.appendChild(amount);

    const datesubmitted = document.createElement('td');
    datesubmitted.innerText = reimbursement.datesubmitted;
    row.appendChild(datesubmitted);

    const dateresolved = document.createElement('td');
    dateresolved.innerText = reimbursement.dateresolved ? reimbursement.dateresolved : '~';
    row.appendChild(dateresolved);

    const description = document.createElement('td');
    description.innerText = reimbursement.description;
    row.appendChild(description);

    const resolver = document.createElement('td');
    resolver.innerText = reimbursement.resolver && reimbursement.resolver;
    row.appendChild(resolver);

    const reimbstatus = document.createElement('td');
    reimbstatus.innerText = reimbursement.status;
    row.appendChild(reimbstatus);

    const reimbtype = document.createElement('td');
    reimbtype.innerText = reimbursement.type;
    row.appendChild(reimbtype);
};
