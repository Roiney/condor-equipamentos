import pandas as pd
from app.infra.repository.sleep_diary_repository import SleepDiaryRepository


class GetPatientStatisticsUseCase:
    def __init__(self, repository: SleepDiaryRepository):
        self.repository = repository

    def execute(self, patient_id: int) -> dict:
        try:
            entries = self.repository.get_entries_by_patient_id(
                patient_id=patient_id,
                offset=0,
                limit=None
            )

            if not entries:
                return {
                    "sleep_duration": None,
                    "awakenings": None
                }

            df = pd.DataFrame([
                {
                    "sleep_duration": e.sleep_duration,
                    "awakenings": e.awakenings
                } for e in entries
            ])

            return {
                "sleep_duration": {
                    "mean": float(round(df["sleep_duration"].mean(), 2)),
                    "min": float(df["sleep_duration"].min()),
                    "max": float(df["sleep_duration"].max()),
                    "std": float(round(df["sleep_duration"].std(ddof=0), 2)),
                },
                "awakenings": {
                    "mean": float(round(df["awakenings"].mean(), 2)),
                    "min": int(df["awakenings"].min()),
                    "max": int(df["awakenings"].max()),
                    "std": float(round(df["awakenings"].std(ddof=0), 2)),
                }
            }

        except Exception as e:
            raise RuntimeError(
                f"Failed to calculate statistics for patient {patient_id}: {e}"
            ) from e
