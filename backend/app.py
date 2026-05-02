from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if data['username'] == "admin" and data['password'] == "1234":
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    features = np.array([[float(data['age']), float(data['balance']), float(data['tenure'])]])
    scaled = scaler.transform(features)

    prob = model.predict_proba(scaled)[0][1]
    result = "Churn" if prob > 0.5 else "Not Churn"

    return jsonify({
        "prediction": result,
        "probability": float(prob)
    })

if __name__ == "__main__":
    app.run(debug=True)
