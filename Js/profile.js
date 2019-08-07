const newFirstName = document.getElementById('firstName');
const newLastName = document.getElementById('lastName');
const newUsername = document.getElementById('username');
const newEmail = document.getElementById('email');
const myUser = JSON.parse(localStorage.getItem('user'));
newFirstName.value = myUser.firstName;
newLastName.value = myUser.lastName;
newUsername.value = myUser.username;
newEmail.value = myUser.email;

async function updateProfile(event) {
    event.preventDefault()
    const error = document.getElementById('error-message');
    error.innerText = '';
   
    const updateUser = {
        userid: myUser.userid,
        firstName: newFirstName.value,
        lastName: newLastName.value,
        username: newUsername.value,
        email: newEmail.value
    }
    console.log(updateUser);
    

    const resp = await fetch(`http://localhost:8012/users`, {
        method: 'PATCH',
        body: JSON.stringify(updateUser),
        credentials: 'include',
        headers : {
            'content-type': 'application/json'
        }
    });
    const users = await resp.json();
    console.log(users);
    addProfile(users);
}

function addProfile(user) {
    newFirstName.value = user.firstName;
    newLastName.value = user.lastName;
    newUsername.value = user.username;
    newEmail.value = user.email;
    localStorage.setItem('user', user);
    };
