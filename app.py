from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from Modeling_Work.Website_Method import make_prediction

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status" : "Server is running on 5000"})

@app.route("/api/send_link", methods=["POST", "OPTIONS"])
@cross_origin()
def send_link():
    if request.method == "OPTIONS":
        return jsonify({"status" : "OK"})

    data = request.get_json()
    url = data.get("url", "")
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Here you would call your make_prediction function and return the result
    # For demonstration, we'll just return the URL
    try:
        prediction = make_prediction(url)
        print(prediction)
        return jsonify({"prediction": float(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

