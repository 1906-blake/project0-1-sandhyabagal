const nav = document.getElementById('app-nav');
nav.classList = 'navbar navbar-expand-md navbar-light bg-light';
nav.innerHTML = `
    <a class="navbar-brand" href="#">ERS-Nav</a>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="../Html/profile.html">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../Html/user.html">Users</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../Html/reimbursement.html">Reimbursements</a>
            </li>
        </ul>
    </div>
    <div id="userNav" class="navuser"></div>
    <a href="../Html/login.html"><button class="btn btn-secondary" type="button" id="logout">Log Out</button></a>
    `;

const user_name = JSON.parse(localStorage.getItem('user'));
if (user_name) {
    document.getElementById('userNav').innerText = user_name.username;
}

