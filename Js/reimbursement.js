console.log("hello");

function addReimbursement(reimbursement) {
    const reimbody = document.getElementById('reimb-body');
    const row = document.createElement('tr');
    reimbody.appendChild(row);

    const reimbId = document.createElement('td');
    reimbId.innerText = reimbursement.reimbursementid;
    row.appendChild(reimbId);

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
    dateresolved.innerText = reimbursement.dateresolved;
    row.appendChild(dateresolved);

    const description = document.createElement('td');
    description.innerText = reimbursement.description;
    row.appendChild(description);

    const resolver = document.createElement('td');
    resolver.innerText = reimbursement.resolver;
    row.appendChild(resolver);

    const reimbstatus = document.createElement('td');
    reimbstatus.innerText = reimbursement.status;
    row.appendChild(reimbstatus);

    const reimbtype = document.createElement('td');
    reimbtype.innerText = reimbursement.type.type;
    row.appendChild(reimbtype);
};

function viewReimbursements() {
    const resp = await fetch('http://localhost:8012/reimbursements', {
        credentials: 'include'
    });
    const reimbursements = await resp.json();
    console.log(reimbursements);
    reimbursements.forEach(addReimbursement);
}
viewReimbursements();``