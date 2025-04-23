from app.infra.adapters.database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid


class SleepDiaryEntry(db.Model):
    __tablename__ = "sleep_diary_entry"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = db.Column(db.Integer, nullable=False)
    sleep_duration = db.Column(db.Float, nullable=False)
    bedtime = db.Column(db.Time, nullable=False)
    awakenings = db.Column(db.Integer, nullable=False)
    medication = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
