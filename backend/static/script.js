let chart;

function predict() {
    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

            let resultText = data.prediction + " (" + prob.toFixed(2) + ")";
            let resultElement = document.getElementById("result");

            resultElement.innerText = resultText;

            // Color based on result
            if (data.prediction === "Churn") {
                resultElement.style.color = "red";
            } else {
                resultElement.style.color = "green";
            }
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
                }
            });
        });
}