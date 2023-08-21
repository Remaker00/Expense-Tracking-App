const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const des = document.getElementById('des').value;
    const price = document.getElementById('price').value;
    const quan = document.getElementById('quan').value;

    const userData = {name,des,price,quan};

    try {
        if (editingUserId) {
            await fetch(`/api/users/${editingUserId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            editingUserId = null; // Clear editing state after update
        } else {
            await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        }

        // Clear form fields
        userForm.reset();

        // Refresh user list
        fetchUsers();
    } catch (error) {
        console.error('Error:', error);
    }
});

function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.des} - ${user.price} - ${user.quan}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteUser(user.id);
                });
                li.appendChild(deleteButton);
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                userList.addEventListener('click', () => {
                    editUser(user.id);
                });
                li.appendChild(editButton);
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Refresh user list
            fetchUsers();
        } else {
            console.error('Error deleting user.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editUser(userId) {
    try {
        editingUserId = userId; // Set the editing state
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();

        console.log('Fetched user data:', userData);

        // Populate form fields with user data for editing
        document.getElementById('name').value = userData.name;
        document.getElementById('des').value = userData.des;
        document.getElementById('price').value = userData.price;
        document.getElementById('quan').value = userData.quan;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchUsers();
