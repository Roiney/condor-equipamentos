from app.domain.entities.sleep_diary_entry_entity import SleepDiaryEntryEntity


class SleepDiaryFactory:
    @staticmethod
    def from_dict(data: dict) -> SleepDiaryEntryEntity:
        return SleepDiaryEntryEntity(**data)
