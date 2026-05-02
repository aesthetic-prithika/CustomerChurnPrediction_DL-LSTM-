const API = "http://127.0.0.1:5000";
let chart;

function login() {
    fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            window.location.href = "predict.html";
        } else {
            alert("Invalid login");
        }
    });
}

function predict() {
    fetch(API + "/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            age: document.getElementById("age").value,
            balance: document.getElementById("balance").value,
            tenure: document.getElementById("tenure").value
        })
    })
    .then(res => res.json())
    .then(data => {
        let prob = data.probability;
        let notProb = 1 - prob;

        document.getElementById("result").innerText =
            data.prediction + " (" + prob.toFixed(2) + ")";

        if (chart) chart.destroy();

        const ctx = document.getElementById("chart");
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Churn', 'Not Churn'],
                datasets: [{
                    label: 'Probability',
                    data: [prob, notProb]
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, max: 1 }
                }
            }
        });
    });
}
