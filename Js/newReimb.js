const userInfo = JSON.parse(localStorage.getItem('user'));
const author = userInfo.userid;

async function newReq(e) {
    e.preventDefault();
    console.log('attempting to submit');

    const newAmount = document.getElementById('subAmount').value;
    const newDesc = document.getElementById('subDescription').value;
    const newType = document.getElementById('subType').value;

    const reimbursement = { //auto-sets the user submitting the reimbursement
        author: author,
        resolver: null,
        dateresolved: null,
        datesubmitted: new Date(),
        status:2
    }
    const submitReimbursement = {
        ...reimbursement,
        reimbursementid: 0,
        amount: +newAmount,
        description: newDesc,
        type: +newType
        
    }
    console.log(submitReimbursement);
    try {
        const res = await fetch('http://localhost:8012/reimbursements', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(submitReimbursement),
            headers: {
                'content-type': 'application/json'
            }
        });

        const reimbursement = await res.json();
        console.log(reimbursement);

    } catch (err) {
        console.log(err);
        console.log('failed to submit');
    };
}