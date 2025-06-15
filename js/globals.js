// Global user info object
window.currentUser = {
    username: localStorage.getItem('username') || null,
    balance: localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0.0,
    courses: JSON.parse(localStorage.getItem('courses') || '[]'),
    isLoggedIn: !!localStorage.getItem('username'),
    id: localStorage.getItem('id') || null
};

// Helper to update global user info from localStorage
window.updateCurrentUser = function() {
    window.currentUser.username = localStorage.getItem('username') || null;
    window.currentUser.balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0.0;
    window.currentUser.isLoggedIn = !!window.currentUser.username;
    window.currentUser.id = localStorage.getItem('id') || null;
    window.currentUser.courses = JSON.parse(localStorage.getItem('courses') || '[]');
};

// Example of how to handle login response
function handleLoginResponse(response) {
    const data = response; // Assuming this is already parsed JSON
    
    // Store all user data in localStorage
    localStorage.setItem('username', data.username);
    localStorage.setItem('balance', data.balance);
    localStorage.setItem('id', data.id);
    localStorage.setItem('courses', JSON.stringify(data.courses));
    
    // Update the global user object
    window.updateCurrentUser();
    
    return data.message; // "Login successful"
}

// New function to fetch balance from API
window.fetchUserBalance = async function(userId) {
    try {
        if (!userId) return null;
        
        const response = await fetch(`https://yntymak.pythonanywhere.com/balance?user_id=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched balance from API:", data);
        
        // Update localStorage and currentUser object
        if (data.balance !== undefined) {
            localStorage.setItem('balance', data.balance);
            window.currentUser.balance = parseFloat(data.balance);
        }
        
        return parseFloat(data.balance);
    } catch (error) {
        console.error("Error fetching balance:", error);
        return window.currentUser.balance; // Fall back to stored value
    }
};
