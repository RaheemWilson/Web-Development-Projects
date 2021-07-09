from flask import Flask

from src.config import DevConfig


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevConfig)

    with app.app_context():
        from . import routes

        return app
        
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)




