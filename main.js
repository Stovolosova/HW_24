const users = [
    {id: 1, firstName: 'Helen', lastName: 'Keller', age: 20},
    {id: 2, firstName: 'Jane', lastName: 'Seymour', age: 25},
    {id: 3, firstName: 'Alex', lastName: 'Turner', age: 30},
];

const userList = document.querySelector('.users-list');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');

const submitButton = document.querySelector('.btn-success');
const saveButton = document.querySelector('.btn-save');
const cancelButton = document.querySelector('.btn-cancel');

function updateLocalStorge () {
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsersFromLocalStorage () {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function displayUsers() {
    userList.innerHTML = '';

    let users = getUsersFromLocalStorage();

    users.forEach((user) => {
        let userItem = document.createElement('li');
        userItem.innerHTML = `${user.firstName} ${user.lastName}`;

        const viewBtn = document.createElement('button');
        viewBtn.innerText = 'View';
        viewBtn.addEventListener('click', () => {
            viewUser(user);
        });
        userItem.appendChild(viewBtn);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => {
            editUser(user);
        });
        userItem.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', () => {
            confirmDeleteUser(user);
        });
        userItem.appendChild(removeBtn);

        userList.appendChild(userItem);
    });
}

function viewUser (user) {
    let userDetails = document.querySelector('.user-details');

    if (!userDetails) {
        userDetails = document.createElement('div');
        userDetails.classList.add('user-details');

        document.body.appendChild(userDetails);
    }
    userDetails.innerHTML = `
    ${user.firstName} ${user.lastName}
    <br>Age:${user.age}`;
}

function editUser(user) {
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    ageInput.value = user.age;

    saveButton.addEventListener('click', () => {
        saveUser(user);
    }); 
}

function saveUser (user) {
        user.firstName = firstNameInput.value;
        user.lastName = lastNameInput.value;
        user.age = ageInput.value;

        updateLocalStorge();
        clearInputs();
        displayUsers();
    
}

function confirmDeleteUser (user) {
    let confirmation = confirm(`Are you sure you want to remove ${user.firstName}${user.lastName}?`);

    if (confirmation) {
        deleteUser(user);
    }
}

function deleteUser(user) {
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users.splice(index, 1);

        updateLocalStorge();
        displayUsers();
    }  
}

 saveButton.addEventListener('click', () => {
   saveUser();
 });

function createUser() {

    const newUser = {
        id: users.length + 1,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        age: ageInput.value
    };

    users.push(newUser);

    firstNameInput.value = '';
    lastNameInput.value = '';
    ageInput.value = '';


    updateLocalStorge();
    displayUsers();
}

function clearInputs () {
    firstNameInput.value = '';
    lastNameInput.value = '';
    ageInput.value = '';
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    createUser();
});

displayUsers();



