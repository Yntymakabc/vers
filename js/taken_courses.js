// Function to fetch tutor data and create cards
async function displayTutorCards() {
    // Get course IDs from localStorage
    const courseIds = JSON.parse(localStorage.getItem('courses') || '[]');
    
    // Container for the cards
    const cardsContainer = document.getElementById('tutor-cards') || document.createElement('div');
    if (!cardsContainer.id) {
        cardsContainer.id = 'tutor-cards';
        document.body.appendChild(cardsContainer);
    }
    
    // Clear any existing cards
    cardsContainer.innerHTML = '';
    
    // Process each course ID
    for (const courseId of courseIds) {
        try {
            // Fetch tutor data
            const response = await fetch(`https://yntymak.pythonanywhere.com//tutor?id=${courseId}`);
            const tutorData = await response.json();
            
            // Create card if data is valid
            if (tutorData && tutorData.id) {
                const card = createTutorCard(tutorData);
                cardsContainer.appendChild(card);
            }
        } catch (error) {
            console.error(`Error fetching data for course ID ${courseId}:`, error);
        }
    }
}

// Function to create a tutor card element
function createTutorCard(tutor) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'tutor-card';
    cardDiv.style.cssText = `
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin: 15px 0;
        max-width: 600px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    `;
    
    cardDiv.innerHTML = `
        <h2 style="color: #4285F4; font-size: 2rem; margin-bottom: 15px;">${tutor.subject || 'Subject'}</h2>
        <p style="font-size: 1.2rem; margin: 8px 0;"><strong>Name:</strong> ${tutor.name || 'N/A'}</p>
        <p style="font-size: 1.2rem; margin: 8px 0;"><strong>ORT Points:</strong> ${tutor.ort_points || 'N/A'}</p>
        <p style="font-size: 1.2rem; margin: 8px 0;"><strong>Experience:</strong> ${tutor.experience || 'N/A'}</p>
        <p style="font-size: 1.2rem; margin: 8px 0;"><strong>Price:</strong> $${tutor.price || 0}/hour</p>
        <p style="font-size: 1.2rem; margin: 8px 0;"><strong>Available Time:</strong> ${tutor.available_day || 'N/A'} ${tutor.course_time_from || ''}-${tutor.course_time_to || ''}</p>
    `;
    
    return cardDiv;
}

// Call the function to display tutor cards
document.addEventListener('DOMContentLoaded', displayTutorCards);

// You can also expose a function to refresh the cards when needed
window.refreshTutorCards = displayTutorCards;