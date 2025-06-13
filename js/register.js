// Register form submission handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Example function to register a user
    function registerUser(username, password) {
        fetch('https://yntymak.pythonanywhere.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response (success or error)
            console.log(data);
            alert('Registration response: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
    }

    // Call the registerUser function with the provided username and password
    registerUser(username, password);
});