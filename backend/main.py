import asyncio
import cv2
from flask import Flask, Response, jsonify, request, render_template
import numpy as np
import tensorflow as tf
from Classification import CohereTool
import sqlite3
from fer import FER
from body_lang import draw_keypoints, draw_connections, analyze


app = Flask(__name__)
emotion_detector = FER(mtcnn=True)


EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}


def init_db():
    conn = sqlite3.connect('tokens.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tokenid TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()



def empty_tokens_table():
    conn = sqlite3.connect('tokens.db')
    cursor = conn.cursor()

    # Delete all rows from the tokens table
    cursor.execute('DELETE FROM tokens')

    conn.commit()
    conn.close()


init_db()


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

def detect_body_lang():
    interpreter = tf.lite.Interpreter(model_path="3.tflite")
    interpreter.allocate_tensors()

    cap = cv2.VideoCapture(0)

    body_lang_score = 0

    emotion_count = {'happy': 0, 'sad': 0, 'disgusted': 0, 'surprise': 0, 'fear': 0, 'neutral': 0, 'angry': 0}

    count = 0
    while cap.isOpened():
        ret, frame = cap.read()

        # Reshape image
        img = frame.copy()

        # analyze emotion detection
        # if img is not None and count > 50:
        #     result = analyze(img)
        #     dominant_emotion = max(result, key=lambda x: result[x])
        #     emotion_count[dominant_emotion] += 1



        img = tf.image.resize_with_pad(np.expand_dims(img, axis=0), 192, 192)

        
        input_image = tf.cast(img, dtype=tf.float32)

        # Get input and output tensors
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        # Make predictions
        input_tensor_index = input_details[0]['index']
        output_tensor_index = output_details[0]['index']
        

        interpreter.set_tensor(input_tensor_index, np.array(input_image))
        interpreter.invoke()
        keypoints_with_scores = interpreter.get_tensor(output_tensor_index)

        # Rendering
        body_lang_score += draw_keypoints(frame, keypoints_with_scores, 0.4)
        draw_connections(frame, keypoints_with_scores, EDGES, 0.4)

        ret, buffer = cv2.imencode('.jpg', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            print(emotion_count)
            break
        count += 1

        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    #return 'hello'
    return render_template('index.html')

@app.route('/video_feed')
async def video_feed():
    # return Response(body_lang(), mimetype='multipart/x-mixed-replace; boundary=frame')
    return Response(detect_body_lang(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/add_to_sql', methods=['POST'])
def add_to_sql():
    new_token = request.json
    tokenId = new_token.get('jobDesc')

    if not tokenId:
        return jsonify({'error': 'Token ID is required'}), 400

    conn = sqlite3.connect('tokens.db')
    cursor = conn.cursor()

    try:
        # Insert the new token into the database
        cursor.execute("INSERT INTO tokens (tokenId) VALUES (?)", (tokenId,))
        conn.commit()

        # Retrieve the inserted token ID
        token_id = cursor.lastrowid

        return jsonify({'success': True, 'id': token_id, 'tokenId': tokenId})

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Token ID must be unique'}), 400

    finally:
        conn.close()


def get_from_sql():
    # Use a context manager to ensure proper resource management
    with sqlite3.connect('tokens.db') as conn:
        cursor = conn.cursor()

        # Retrieve the latest token based on timestamp or ID
        cursor.execute('SELECT * FROM tokens LIMIT 1')
        token = cursor.fetchone()

    if token:
        return token[1]
    else:
        return "No description available"


@app.route('/run_cohere_analysis', methods=['POST'])
def run_cohere_analysis():
    # Getting params from json
    new_token = request.json
    audio_transcript = new_token.get('audio_transcript')
    question = new_token.get('question')

    # Checking params
    if not (audio_transcript and question):
        return jsonify({'error': 'Missing parameters!'}), 400

    # Getting job description from database
    job_description = get_from_sql()

    # Running cohere analysis
    tool = CohereTool(audio_transcript, job_description, question)
    sentiment, confidence = tool.get_sentiment_analysis()
    feedback = tool.get_response_feedback()

    # Returning data
    return_data = {"sentiment": sentiment,
                   "confidence": confidence, "feedback": feedback}
    empty_tokens_table()
    return jsonify(return_data)


if __name__ == '__main__':
    app.after_request(add_cors_headers)
    app.run(port=4000, debug=True)
