document.addEventListener('DOMContentLoaded', () => {
    const gpaCtx = document.getElementById('gpa-chart');
    if (gpaCtx) {
        new Chart(gpaCtx, {
            type: 'line',
            data: {
                labels: ['Prelim', 'Midterm', 'Final'],
                datasets: [{
                    label: 'GPA Progress (Lower is Better)',
                    data: [2.5, 2.2, 2.0],
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
                        min: 1,
                        max: 5,
                        reverse: true,
                        ticks: {
                            stepSize: 0.25
                        }
                    }
                },
                plugins: {
                    tooltip: { enabled: true },
                    legend: { display: true }
                }
            }
        });
    }

    const trendCtx = document.getElementById('trend-chart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Term 1', 'Term 2', 'Term 3'],
                datasets: [{
                    label: 'Historical GPA',
                    data: [2.5, 2.3, 2.0],
                    borderColor: getComputedStyle(document.body).getPropertyValue('--primary'),
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        reverse: true
                    }
                }
            }
        });
    }
});
