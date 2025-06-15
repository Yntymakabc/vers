// Register form submission handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

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
        // If registration is successful, redirect to login.html, else show error
        if (data.message && data.message.toLowerCase().includes("success")) {
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed!');
    });
});