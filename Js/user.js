function addUserRow(user) { // adding all users info into table body from sql
    if(!user) {
        return;
    }
    const userbody = document.getElementById('user-body');
    const row = document.createElement('tr');
    userbody.appendChild(row);
    
    const userIdData = document.createElement('td');
    userIdData.innerText = user.userid;
    row.appendChild(userIdData);

    const usernameData = document.createElement('td');
    usernameData.innerText = user.username;
    row.appendChild(usernameData);

    const firstnameData = document.createElement('td');
    firstnameData.innerText = user.firstName;
    row.appendChild(firstnameData);

    const lastnameData = document.createElement('td');
    lastnameData.innerText = user.lastName;
    row.appendChild(lastnameData);

    const emailData = document.createElement('td');
    emailData.innerText = user.email;
    row.appendChild(emailData);

    const roleData = document.createElement('td');
    roleData.innerText = user.roleid;
    row.appendChild(roleData);
};

async function getAllUsers() { //view all users endpoint
    const resp = await fetch('http://localhost:8012/users', {
        method: 'GET',
        credentials: 'include'
    });
    const users = await resp.json();
    console.log(users);
    users.forEach(addUserRow);
}