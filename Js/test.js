async function sandyReimb(userid) { //view reimbursements by status endpoint
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