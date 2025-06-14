// Global user info object
window.currentUser = {
    username: localStorage.getItem('username') || null,
    balance: localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0.0,
    courses: [],
    isLoggedIn: !!localStorage.getItem('username'),
    id: localStorage.getItem('id') || null
};

// Helper to update global user info from localStorage
window.updateCurrentUser = function() {
    window.currentUser.username = localStorage.getItem('username') || null;
    window.currentUser.balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0.0;
    window.currentUser.isLoggedIn = !!window.currentUser.username;
    window.currentUser.id = localStorage.getItem('id') || null;
    // You can add logic to load courses if you store them in localStorage
    // window.currentUser.courses = JSON.parse(localStorage.getItem('courses') || '[]');
};
