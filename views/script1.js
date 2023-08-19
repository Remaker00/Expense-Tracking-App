const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const expense = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const userData = {
        expense,
        description,
        category
    };

    try {
        await fetch('/exp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Clear form fields
        userForm.reset();

        // Refresh user list
        fetchUsers();
    } catch (error) {
        console.error('Error:', error);
    }
});

function fetchUsers() {
    fetch('/exp')
        .then(response => response.json())
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.expense} - ${user.description} - ${user.category}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteUser(user.id);
                });
                li.appendChild(deleteButton);
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/exp/${userId}`, {
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

fetchUsers();