document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('gpa-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Prelim', 'Midterm', 'Final'],
                datasets: [{
                    label: 'GPA Progress',
                    data: [3.0, 3.2, 3.25],
                    borderColor: getComputedStyle(document.body).getPropertyValue('--primary'),
                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        max: 4.0
                    }
                }
            }
        });
    }
});