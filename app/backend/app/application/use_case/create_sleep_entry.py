from app.domain.factories.sleep_diary_factory import SleepDiaryFactory
from app.infra.repository.sleep_diary_repository import SleepDiaryRepository


class CreateSleepEntryUseCase:
    # Inversion of Dependency
    def __init__(self, repository: SleepDiaryRepository):
        self.repository = repository

    def execute(self, data: dict):
        entity = SleepDiaryFactory.from_dict(data)
        return self.repository.save(entity)
