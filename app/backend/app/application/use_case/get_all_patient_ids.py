from app.infra.repository.sleep_diary_repository import SleepDiaryRepository


class GetAllPatientIdsUseCase:
    def __init__(self, repository: SleepDiaryRepository):
        self.repository = repository

    def execute(self, page: int = 1, page_size: int = 10):
        patient_ids = self.repository.get_distinct_patient_ids(page, page_size)
        total = self.repository.count_distinct_patient_ids()
        return {
            "patient_ids": patient_ids,
            "total": total,
            "page": page,
            "page_size": page_size
        }
