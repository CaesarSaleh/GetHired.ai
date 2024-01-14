from flask import Flask, jsonify, request


app = Flask(__name__)


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response


@app.route('/')
def index():
    return 'hello'


@app.route('/run_cohere_analysis', methods=['POST'])
def run_cohere_analysis():
    # Getting params from json
    new_token = request.json
    audio_transcript = new_token.get('audio_transcript')
    job_description = new_token.get('job_description')
    question = new_token.get('question')

    # Checking params
    if not (audio_transcript and job_description and question):
        return jsonify({'error': 'Missing parameters!'}), 400

    # Running cohere analysis
    tool = CohereTool(audio_transcript, job_description, question)
    sentiment, confidence = tool.get_sentiment_analysis()
    feedback = tool.get_response_feedback()

    # Returning data
    return_data = {"sentiment": sentiment, "confidence": confidence, "feedback": feedback}
    return jsonify(return_data)


if __name__ == '__main__':
    app.after_request(add_cors_headers)
    app.run(port=4000, debug=True)

