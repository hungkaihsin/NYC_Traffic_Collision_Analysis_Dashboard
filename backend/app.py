from flask import Flask
from flask_cors import CORS
from routes.crash_data import crash_data_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(crash_data_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=5001)