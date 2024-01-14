from flask import Flask, jsonify, request, render_template
from Classification import CohereTool
import sqlite3


app = Flask(__name__)


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

def empty_tokens_table2():
    conn = sqlite3.connect('sentiment_data.db')
    cursor = conn.cursor()

    # Delete all rows from the tokens table
    cursor.execute('DELETE FROM sentiment_data')

    conn.commit()
    conn.close()


init_db()


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response


@app.route('/')
def index():
    #return 'hello'
    return render_template('index.html')


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

    conn = sqlite3.connect('sentiment_data')
    cursor = conn.cursor()

        # Create a table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sentiment_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sentiment TEXT,
            confidence REAL,
            feedback TEXT
        )
    ''')

        # Insert data into the table
    cursor.execute('''
        INSERT INTO sentiment_data (sentiment, confidence, feedback)
        VALUES (?, ?, ?)
    ''', (return_data["sentiment"], return_data["confidence"], return_data["feedback"]))

        # Commit the changes and close the connection
    conn.commit()
    conn.close()

    empty_tokens_table()

 @app.route('/get_analysis', methods=['GET'])
 from flask import jsonify

 def get_last_data_from_sentiment_data():
     database_path = 'sentiment_data.db'
     conn = sqlite3.connect(database_path)
     cursor = conn.cursor()

     try:
         # Select all rows from the 'sentiment_data' table ordered by id in descending order
         cursor.execute('''
             SELECT * FROM sentiment_data
             ORDER BY id DESC
             LIMIT 1
         ''')

         row = None
         for row in cursor:
             pass  # Iterate over the cursor to get the last row

         if row is not None:
             data_dict = {
                 "id": row[0],
                 "sentiment": row[1],
                 "confidence": row[2],
                 "feedback": row[3]
             }
             empty_tokens_table2()
             return jsonify(data_dict)
         else:
             return jsonify({"message": "No data available"})

     except sqlite3.Error as e:
         print(f"SQLite error: {e}")
         return jsonify({"error": "Internal Server Error"})

     finally:
         conn.close()


if __name__ == '__main__':
    app.after_request(add_cors_headers)
    app.run(port=4000, debug=True)
