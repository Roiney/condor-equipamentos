from datetime import time, datetime
from dataclasses import dataclass, field
from uuid import uuid4


@dataclass
class SleepDiaryEntryEntity:
    patient_id: int
    sleep_duration: float
    bedtime: time
    awakenings: int
    medication: bool
    id: str = field(default_factory=lambda: str(uuid4()))
    created_at: datetime = field(default_factory=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "sleep_duration": self.sleep_duration,
            "bedtime": self.bedtime.strftime("%H:%M"),
            "awakenings": self.awakenings,
            "medication": self.medication,
            "created_at": self.created_at.isoformat()
        }
