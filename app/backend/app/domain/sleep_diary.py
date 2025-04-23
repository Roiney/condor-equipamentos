from app.domain.models.sleep_diary import SleepDiaryEntry


class SleepDiaryFactory:
    @staticmethod
    def create_from_dict(data: dict) -> SleepDiaryEntry:
        return SleepDiaryEntry(
            patient_id=data["patient_id"],
            sleep_duration=data["sleep_duration"],
            bedtime=data["bedtime"],
            awakenings=data["awakenings"],
            medication=data["medication"]
        )
