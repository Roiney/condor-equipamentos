from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def hello():
        return "API do Diário do Sono está no ar!"

    return app
