// Subscriber management using in-memory storage with persistence simulation
let subscriberData = {
    count: 0,
    lastUpdated: Date.now()
};

// Load subscriber count on page load
function loadSubscriberCount() {
    // In a real application, this would load from a database
    // For demonstration, we'll simulate persistence within the session
    if (window.subscriberStorage) {
        subscriberData = window.subscriberStorage;
    } else {
        window.subscriberStorage = subscriberData;
    }
    updateSubscriberDisplay();
}

function updateSubscriberDisplay() {
    document.getElementById('subscriber-count').textContent = subscriberData.count.toLocaleString();
}

function saveSubscriberCount() {
    subscriberData.lastUpdated = Date.now();
    window.subscriberStorage = subscriberData;
}

function incrementSubscribers() {
    subscriberData.count++;
    updateSubscriberDisplay();
    saveSubscriberCount();
    
    // Visual feedback
    const counterElement = document.getElementById('subscriber-count');
    counterElement.style.transform = 'scale(1.1)';
    counterElement.style.color = '#f5576c';
    setTimeout(() => {
        counterElement.style.transform = 'scale(1)';
        counterElement.style.color = 'white';
    }, 200);
}

// Thank you notes management with persistence
let thankYouNotes = [
    {
        message: "Thank you for making learning accessible to everyone!",
        author: "Sarah M.",
        timestamp: Date.now() - 86400000 // 1 day ago
    },
    {
        message: "Your videos helped me pass my GED. I'm now in college!",
        author: "Mike T.",
        timestamp: Date.now() - 172800000 // 2 days ago
    },
    {
        message: "Amazing content and great explanations. Keep up the good work!",
        author: "Lisa K.",
        timestamp: Date.now() - 259200000 // 3 days ago
    }
];

// Load thank you notes on page load
function loadThankYouNotes() {
    if (window.thankYouStorage) {
        thankYouNotes = window.thankYouStorage;
    } else {
        window.thankYouStorage = thankYouNotes;
    }
    displayThankYouNotes();
}

function saveThankYouNotes() {
    window.thankYouStorage = thankYouNotes;
}

function displayThankYouNotes() {
    const container = document.getElementById('sticky-notes-container');
    container.innerHTML = '';
    
    thankYouNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'sticky-note';
        noteElement.innerHTML = `
            <p>"${note.message}"</p>
            <small>- ${note.author}</small>
        `;
        container.appendChild(noteElement);
    });
}

function addThankYouNote() {
    const messageInput = document.getElementById('thank-you-message');
    const nameInput = document.getElementById('user-name');
    const message = messageInput.value.trim();
    const name = nameInput.value.trim() || 'Anonymous';
    
    if (message) {
        const newNote = {
            message: message,
            author: name,
            timestamp: Date.now()
        };
        
        thankYouNotes.unshift(newNote); // Add to beginning of array
        saveThankYouNotes();
        displayThankYouNotes();
        
        // Clear the form
        messageInput.value = '';
        nameInput.value = '';
        
        // Show success feedback
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Thank You Posted!';
        submitBtn.style.background = '#4caf50';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        }, 2000);
    }
}

// Initialize thank you notes when page loads
window.addEventListener('load', function() {
    loadSubscriberCount();
    loadThankYouNotes();
});

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Hide main navigation
    document.getElementById('main-nav').style.display = 'none';
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

function showMainNav() {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show main navigation
    document.getElementById('main-nav').style.display = 'flex';
}

function showSubject(subjectId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected subject page
    document.getElementById(subjectId).classList.add('active');
}

function addThankYouNote() {
    const messageInput = document.getElementById('thank-you-message');
    const nameInput = document.getElementById('user-name');
    const message = messageInput.value.trim();
    const name = nameInput.value.trim() || 'Anonymous';
    
    if (message) {
        const newNote = {
            message: message,
            author: name,
            timestamp: Date.now()
        };
        
        thankYouNotes.unshift(newNote); // Add to beginning of array
        saveThankYouNotes();
        displayThankYouNotes();
        
        // Clear the form
        messageInput.value = '';
        nameInput.value = '';
        
        // Show success feedback
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Thank You Posted!';
        submitBtn.style.background = '#4caf50';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        }, 2000);
    }
}
