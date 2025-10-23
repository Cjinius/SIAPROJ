// script.js - Handles all interactivity for the Modern Student Portal

document.addEventListener('DOMContentLoaded', () => {
    const user = { name: 'Elleran, CJ', section: 'LFAU311N010', gpa: '2.00', studentNumber: 'UA202200984' };
    let darkMode = localStorage.getItem('darkMode') === 'true';
    let index = 0;

    // Initialize user data
    if (!localStorage.getItem('userGPA')) localStorage.setItem('userGPA', user.gpa);
    if (!localStorage.getItem('userName')) localStorage.setItem('userName', user.name);
    if (!localStorage.getItem('userSection')) localStorage.setItem('userSection', user.section);

    // Theme and Dark Mode
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            document.body.classList.toggle('dark-mode', darkMode);
            localStorage.setItem('darkMode', darkMode);
        });
        document.body.classList.toggle('dark-mode', darkMode);
    }

    // Sidebar Toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('nav.sidebar').classList.toggle('collapsed');
        });
    }

    // Notifications
    const notificationsBell = document.getElementById('notifications-bell');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    if (notificationsBell && notificationsDropdown) {
        notificationsBell.addEventListener('click', () => {
            notificationsDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!notificationsBell.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                notificationsDropdown.classList.add('hidden');
            }
        });
    }

    // Login Page
    const loginForm = document.getElementById('login-form');
    const forgotModal = document.getElementById('forgot-modal');
    const resetForm = document.getElementById('reset-form');
    const togglePassword = document.getElementById('toggle-password');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const studentNumber = document.getElementById('student-number').value;
            const password = document.getElementById('password').value;
            if (studentNumber === user.studentNumber && password === 'password123') {
                alert('Login successful! Redirecting...');
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials!');
            }
        });
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const passwordField = document.getElementById('password');
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                togglePassword.innerHTML = `<i class="fas fa-eye${type === 'password' ? '' : '-slash'}"></i>`;
            });
        }
        document.getElementById('forgot-password').addEventListener('click', () => forgotModal.showModal());
        if (resetForm) {
            resetForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Reset link sent to your email!');
                forgotModal.close();
            });
            document.getElementById('close-modal').addEventListener('click', () => forgotModal.close());
        }
    }

    // Dashboard
    const gpaInput = document.getElementById('gpa-input');
    const updateGpaBtn = document.getElementById('update-gpa');
    if (gpaInput && updateGpaBtn) {
        updateGpaBtn.addEventListener('click', () => {
            const newGpa = parseFloat(gpaInput.value);
            if (newGpa >= 1 && newGpa <= 5) {
                localStorage.setItem('userGPA', newGpa);
                document.querySelectorAll('#user-gpa').forEach(el => el.textContent = newGpa);
                if (window.gpaChart) {
                    gpaChart.data.datasets[0].data[2] = newGpa;
                    gpaChart.update();
                }
                alert('GPA updated and chart refreshed!');
            } else {
                alert('GPA must be between 1.00 and 5.00!');
            }
        });
    }
    if (document.getElementById('gpa-chart')) {
        const ctx = document.getElementById('gpa-chart').getContext('2d');
        window.gpaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Oct 2024', 'Jul 2025', 'Oct 2025'],
                datasets: [{
                    label: 'GPA Progress',
                    data: [2.50, 2.25, parseFloat(localStorage.getItem('userGPA') || '2.00')],
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        reverse: true,
                        min: 1,
                        max: 5,
                        ticks: { stepSize: 0.25, callback: function(value) { return value.toFixed(2); } },
                        title: { display: true, text: 'GPA (1.00 - 5.00)' }
                    },
                    x: { title: { display: true, text: 'Date' } }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                }
            }
        });
    }
    if (document.getElementById('countdown')) {
        const countdown = setInterval(() => {
            const now = new Date('2025-10-23T15:30:00-07:00'); // 03:30 PM PST, Oct 23, 2025
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5);
            const diff = target - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('countdown').textContent = `${days} days`;
        }, 1000);
    }

    // Announcements
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    if (carouselContainer && prevBtn && nextBtn) {
        const cards = carouselContainer.children;
        prevBtn.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : cards.length - 1;
            carouselContainer.style.transform = `translateX(-${index * 100}%)`;
        });
        nextBtn.addEventListener('click', () => {
            index = (index < cards.length - 1) ? index + 1 : 0;
            carouselContainer.style.transform = `translateX(-${index * 100}%)`;
        });
        document.querySelectorAll('.mark-read').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.style.opacity = '0.5';
                btn.disabled = true;
            });
        });
    }

    // Profile
    const profileForm = document.getElementById('profile-form');
    const editToggle = document.getElementById('edit-mode-toggle');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const cropperContainer = document.getElementById('cropper-container');
    const cropperImage = document.getElementById('cropper-image');
    const cropBtn = document.getElementById('crop-btn');
    if (profileForm && editToggle) {
        editToggle.addEventListener('click', () => {
            const inputs = profileForm.querySelectorAll('input:not([readonly])');
            inputs.forEach(input => input.disabled = !input.disabled);
            profileForm.querySelector('button').disabled = !profileForm.querySelector('button').disabled;
            editToggle.textContent = editToggle.textContent.includes('Edit') ? 'Save Mode' : 'Edit Mode';
        });
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = profileForm.querySelectorAll('input:not([readonly])');
            inputs.forEach(input => localStorage.setItem(input.previousElementSibling.textContent.trim(), input.value));
            alert('Profile saved!');
            editToggle.click();
        });
    }
    if (profilePicUpload && cropperContainer) {
        profilePicUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                cropperImage.src = reader.result;
                cropperContainer.classList.remove('hidden');
                new Cropper(cropperImage, {
                    aspectRatio: 1,
                    crop: () => {
                        const canvas = cropperImage.cropper.getCroppedCanvas();
                        document.getElementById('profile-pic').src = canvas.toDataURL();
                        cropperContainer.classList.add('hidden');
                    }
                });
            };
            reader.readAsDataURL(file);
        });
        cropBtn.addEventListener('click', () => cropperImage.cropper.getCroppedCanvas().toBlob(blob => {
            document.getElementById('profile-pic').src = URL.createObjectURL(blob);
            cropperContainer.classList.add('hidden');
        }));
    }

    // Documents
    const dropZone = document.getElementById('drop-zone');
    const progressBar = document.querySelector('.progress-bar .progress');
    const progressText = document.querySelector('.progress-bar span');
    const totalDocuments = 3;
    let uploadedCount = 0;
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => e.preventDefault());
        });
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            Array.from(files).forEach(file => uploadFile(file));
        });
        document.querySelectorAll('.upload-btn').forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const fileInput = btn.previousElementSibling;
                if (fileInput.files.length > 0) {
                    uploadFile(fileInput.files[0], idx);
                }
            });
        });
    }
    function uploadFile(file, idx) {
        uploadedCount++;
        progressBar.style.width = `${(uploadedCount / totalDocuments) * 100}%`;
        progressText.textContent = `${uploadedCount} of ${totalDocuments} uploaded`;
        const status = document.querySelectorAll('.status')[idx];
        const downloadBtn = document.querySelectorAll('.download-btn')[idx];
        status.textContent = 'Uploaded';
        downloadBtn.classList.remove('hidden');
        const preview = document.querySelectorAll('.file-preview')[idx];
        preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Preview" style="max-width: 100px;">`;
        preview.classList.remove('hidden');
    }

    // Subjects
    const subjectsTable = document.getElementById('subjects-table');
    const addSubjectForm = document.getElementById('add-subject');
    const toggleAddSubject = document.getElementById('toggle-add-subject');
    if (subjectsTable) {
        subjectsTable.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => {
                const key = th.dataset.sort;
                const tbody = subjectsTable.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                rows.sort((a, b) => {
                    const aVal = a.cells[Array.from(th.parentElement.children).indexOf(th)].textContent;
                    const bVal = b.cells[Array.from(th.parentElement.children).indexOf(th)].textContent;
                    return aVal.localeCompare(bVal);
                });
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    }
    if (addSubjectForm && toggleAddSubject) {
        toggleAddSubject.addEventListener('click', () => {
            addSubjectForm.classList.toggle('hidden');
        });
        addSubjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const [code, title, units] = [e.target[0].value, e.target[1].value, e.target[2].value];
            const tbody = document.querySelector('#subjects-table tbody');
            const row = document.createElement('tr');
            row.innerHTML = `<td>${code}</td><td>${title}</td><td>${units}</td><td>0</td><td>${units}</td><td>-</td><td>-</td><td contenteditable="true"></td>`;
            tbody.appendChild(row);
            addSubjectForm.classList.add('hidden');
            alert('Subject added!');
        });
    }

    // Schedule
    if (document.getElementById('calendar')) {
        // FullCalendar initialization is handled in schedule.html
    }

    // Grades
    const gradeCalcForm = document.getElementById('grade-calc-form');
    if (gradeCalcForm) {
        gradeCalcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const [prelim, midterm, final] = [
                parseFloat(e.target[0].value),
                parseFloat(e.target[1].value),
                parseFloat(e.target[2].value)
            ];
            const avg = ((prelim + midterm + final) / 3).toFixed(2);
            document.getElementById('calc-result').textContent = `Estimated GPA: ${avg}`;
        });
    }
    if (document.getElementById('trend-chart')) {
        const ctx = document.getElementById('trend-chart').getContext('2d');
        window.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Oct 2024', 'Jul 2025', 'Oct 2025'],
                datasets: [{
                    label: 'GPA Trend',
                    data: [2.50, 2.25, parseFloat(localStorage.getItem('userGPA') || '2.00')],
                    borderColor: '#50c9c3',
                    backgroundColor: 'rgba(80, 201, 195, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        reverse: true,
                        min: 1,
                        max: 5,
                        ticks: { stepSize: 0.25, callback: function(value) { return value.toFixed(2); } },
                        title: { display: true, text: 'GPA (1.00 - 5.00)' }
                    },
                    x: { title: { display: true, text: 'Date' } }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                }
            }
        });

        // Sync with GPA update
        if (gpaInput && updateGpaBtn) {
            updateGpaBtn.addEventListener('click', () => {
                const newGpa = parseFloat(gpaInput.value);
                if (newGpa >= 1 && newGpa <= 5) {
                    trendChart.data.datasets[0].data[2] = newGpa;
                    trendChart.update();
                }
            });
        }
    }

    // Payments
    const payNowBtn = document.querySelector('.pay-now-btn');
    const paymentModal = document.getElementById('payment-modal');
    if (payNowBtn && paymentModal) {
        payNowBtn.addEventListener('click', () => paymentModal.showModal());
        document.getElementById('close-payment-modal').addEventListener('click', () => paymentModal.close());
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment processed! (Mock)');
            paymentModal.close();
        });
    }
    if (document.getElementById('payment-countdown')) {
        const countdown = setInterval(() => {
            const now = new Date('2025-10-23T15:30:00-07:00'); // 03:30 PM PST, Oct 23, 2025
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
            const diff = target - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('payment-countdown').textContent = `${days} days`;
        }, 1000);
    }

    // Clearance
    document.querySelectorAll('.resolve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.previousElementSibling.textContent = 'Completed';
            btn.disabled = true;
            btn.textContent = 'Resolved';
        });
    });

    // Support
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatWindow = document.getElementById('chat-window');
    if (chatInput && chatSend && chatWindow) {
        chatSend.addEventListener('click', () => {
            const message = chatInput.value;
            if (message) {
                chatWindow.innerHTML += `<p>You: ${message}</p>`;
                chatWindow.innerHTML += `<p>Bot: Thank you! We'll assist you soon.</p>`;
                chatInput.value = '';
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
        });
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') chatSend.click();
        });
    }
    document.getElementById('ticket-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Ticket submitted! (Mock)');
    });

    // Feedback
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouModal = document.getElementById('thank-you-modal');
    if (feedbackForm && thankYouModal) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = document.getElementById('feedback-attachment').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    document.getElementById('attachment-preview').innerHTML = `<img src="${reader.result}" alt="Attachment" style="max-width: 100px;">`;
                    document.getElementById('attachment-preview').classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
            thankYouModal.classList.remove('hidden');
        });
        document.getElementById('close-thank-you').addEventListener('click', () => thankYouModal.classList.add('hidden'));
    }

    // Settings
    const themeSelect = document.getElementById('theme-select');
    const customColor = document.getElementById('custom-color');
    if (themeSelect) {
        themeSelect.addEventListener('change', () => {
            document.body.className = themeSelect.value + '-theme';
            document.getElementById('theme-preview').style.background = getComputedStyle(document.body).getPropertyValue('--card-bg');
        });
    }
    if (customColor) {
        customColor.addEventListener('input', () => {
            document.documentElement.style.setProperty('--primary', customColor.value);
            document.getElementById('theme-preview').style.borderColor = customColor.value;
        });
    }
    document.getElementById('backup-settings').addEventListener('click', () => {
        const data = JSON.stringify({ ...user, gpa: localStorage.getItem('userGPA') });
        const a = document.createElement('a');
        a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        a.download = 'profile_backup.json';
        a.click();
    });
});
