document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Notifications
    const notificationsBell = document.getElementById('notifications-bell');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    if (notificationsBell) {
        notificationsBell.addEventListener('click', () => {
            notificationsDropdown.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!notificationsBell.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                notificationsDropdown.classList.remove('show');
            }
        });
    }

    // Login Form (Mock)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Logged in successfully (mocked)! Redirecting to dashboard.');
            window.location.href = 'dashboard.html';
        });
    }

    // Document Upload
    const documentsList = document.querySelector('.documents-list');
    if (documentsList) {
        const progressBar = document.querySelector('.progress');
        const progressText = document.querySelector('.progress-bar span');
        let uploadedCount = 0;
        const totalDocuments = documentsList.querySelectorAll('li').length;

        documentsList.querySelectorAll('.upload-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const fileInput = btn.previousElementSibling;
                if (fileInput.files.length > 0) {
                    // Mock validation
                    const status = btn.parentElement.querySelector('.status');
                    status.textContent = 'Uploaded';
                    status.style.color = 'green';
                    uploadedCount++;
                    progressBar.style.width = `${(uploadedCount / totalDocuments) * 100}%`;
                    progressText.textContent = `${uploadedCount} of ${totalDocuments} uploaded`;
                    alert('Uploaded (mock)!');
                }
            });
        });
    }

    // Search Tables
    const subjectsSearch = document.getElementById('subjects-search');
    const subjectsTable = document.querySelector('#subjects table tbody');
    if (subjectsSearch && subjectsTable) {
        subjectsSearch.addEventListener('input', () => {
            const filter = subjectsSearch.value.toLowerCase();
            const rows = subjectsTable.querySelectorAll('tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }

    const gradesSearch = document.getElementById('grades-search');
    const gradesTable = document.querySelector('#grades table tbody');
    if (gradesSearch && gradesTable) {
        gradesSearch.addEventListener('input', () => {
            const filter = gradesSearch.value.toLowerCase();
            const rows = gradesTable.querySelectorAll('tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }

    // Profile Form (Mock)
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Profile updated (mock)!');
        });
    }

    // Feedback Form
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Feedback sent (mock)!');
            feedbackForm.reset();
        });
    }

    // Settings Save
    const saveSettings = document.getElementById('save-settings');
    if (saveSettings) {
        saveSettings.addEventListener('click', () => {
            alert('Settings saved (mock)!');
        });
    }

    // Clearance Resolve
    const resolveBtns = document.querySelectorAll('.resolve-btn');
    resolveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const status = btn.parentElement.previousElementSibling;
            status.textContent = 'Completed';
            status.style.color = 'green';
            alert('Resolved (mock)!');
        });
    });

    // Pay Now (Mock)
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', () => {
            alert('Payment processed (mock)!');
        });
    }

    // Live Chat (Mock)
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            alert('Opening live chat (mock)!');
        });
    }
});