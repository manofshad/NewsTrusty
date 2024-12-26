from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

model_path = "Models/fake_news_detector.pkl"
vectorizer_path = "Models/tfidf_vectorizer.pkl"

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'title' not in data or 'text' not in data:
        return jsonify({'error': 'Invalid input data'}), 400

    combined_text = f"{data['title']} {data['text']}"

    transformed_text = vectorizer.transform([combined_text])

    prediction = model.predict(transformed_text)[0]

    prediction = int(prediction) if isinstance(prediction, np.generic) else prediction

    if prediction == 0:
        prediction = "Real"
    if prediction == 1:
        prediction = "Fake"

    return jsonify({'prediction': prediction})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
