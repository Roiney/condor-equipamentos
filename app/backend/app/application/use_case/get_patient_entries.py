from app.infra.repository.sleep_diary_repository import SleepDiaryRepository


class GetPatientEntriesUseCase:
    def __init__(self, repository: SleepDiaryRepository):
        self.repository = repository

    def execute(
        self,
        patient_id: int,
        page: int = 1,
        page_size: int = 10
    ) -> dict:
        try:
            offset = (page - 1) * page_size

            entries = self.repository.get_entries_by_patient_id(
                patient_id=patient_id,
                offset=offset,
                limit=page_size
            )

            serialized = [entry.serialize() for entry in entries]
            total = self.repository.count_entries_by_patient_id(patient_id)

            return {
                "entries": serialized,
                "page": page,
                "page_size": page_size,
                "total": total
            }

        except Exception as e:
            raise RuntimeError(
                f"Failed to retrieve entries for patient {patient_id}: {e}"
            ) from e
