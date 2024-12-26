# NewsTrusty

**NewsTrusty** is a browser extension designed to verify the authenticity of news articles. It extracts the title and text of a webpage and uses a machine learning model to predict whether the news is real or fake.

## Features

- Extracts the title and main content of a news webpage.
- Sends the extracted data to a Flask server hosting a machine learning model.
- Displays the prediction ("Real" or "Fake") directly in the browser extension popup.
- User-friendly interface with color-coded predictions.

## Installation

1. Clone the repository or download the source code.
2. Load the extension:
   - Open your browser and go to `chrome://extensions/`.
   - Enable **Developer mode** in the top-right corner.
   - Click on **Load unpacked** and select the folder containing the project files.
3. Ensure the Flask server is running locally on `http://localhost:5000`.

## Usage

1. Open a news webpage in your browser.
2. Click on the **NewsTrusty** extension icon.
3. Click the **Verify News** button in the popup.
4. The result will be displayed in the popup, indicating if the news is real or fake.

## Prerequisites

- Python 3.7 or higher
- Required Python packages:
  - Flask
  - Scikit-learn
  - Joblib (or Pickle)
  
Install the Python packages using:
```
pip install flask scikit-learn joblib
```
