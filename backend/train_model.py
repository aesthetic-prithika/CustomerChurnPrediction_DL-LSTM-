import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import pickle

data = pd.DataFrame({
    'age': np.random.randint(18, 60, 500),
    'balance': np.random.randint(1000, 50000, 500),
    'tenure': np.random.randint(1, 10, 500),
    'churn': np.random.randint(0, 2, 500)
})

X = data[['age', 'balance', 'tenure']]
y = data['churn']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = LogisticRegression()
model.fit(X_scaled, y)

pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))
