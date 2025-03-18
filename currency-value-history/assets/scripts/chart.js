const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
            label: 'Cases Reported',
            data: [10, 20, 15, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});