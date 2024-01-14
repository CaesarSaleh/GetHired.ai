from flask import Flask


app = Flask(__name__)


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response


@app.route('/')
def index():
    return 'hello'


if __name__ == '__main__':
    app.after_request(add_cors_headers)
    app.run(port=4000, debug=True)

