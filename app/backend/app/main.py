from flask import Flask
from flask_restx import Api
from app.config import Config
from app.infra.adapters.database import init_db, db
from app.domain.models.sleep_diary import SleepDiaryEntry  # noqa: F401
from app.infra.controller.patient_controller import ns as patient_ns
from app.infra.controller.doctor_controller import ns as doctor_ns


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)

    with app.app_context():
        db.create_all()

    api = Api(
        app,
        title="Sleep Diary API",
        version="1.0",
        description=(
            "API for patients to register sleep data "
            "and for doctors to review it"
        ),
        doc="/docs",
    )

    api.add_namespace(patient_ns, path="/patient")
    api.add_namespace(doctor_ns, path="/doctor")

    return app
