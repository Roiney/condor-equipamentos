from app.domain.entities.sleep_diary_entry_entity import SleepDiaryEntryEntity
from app.domain.models.sleep_diary import SleepDiaryEntry  # SQLAlchemy model
from app.infra.adapters.database import db


class SleepDiaryRepository:
    def save(self, entity: SleepDiaryEntryEntity) -> SleepDiaryEntryEntity:
        model = SleepDiaryEntry(
            id=entity.id,
            patient_id=entity.patient_id,
            sleep_duration=entity.sleep_duration,
            bedtime=entity.bedtime,
            awakenings=entity.awakenings,
            medication=entity.medication,
            created_at=entity.created_at,
        )
        db.session.add(model)
        db.session.commit()

        return entity  # Retorna a entidade, não o modelo ORM

    def get_distinct_patient_ids(
        self,
        page: int = 1,
        page_size: int = 10
    ) -> list[int]:
        offset = (page - 1) * page_size

        result = (
            db.session.query(SleepDiaryEntry.patient_id)
            .distinct()
            .offset(offset)
            .limit(page_size)
            .all()
        )

        return [row[0] for row in result]

    def count_distinct_patient_ids(self) -> int:
        return (
            db.session.query(SleepDiaryEntry.patient_id)
            .distinct()
            .count()
        )

    def get_entries_by_patient_id(
        self,
        patient_id: int,
        offset: int = 0,
        limit: int | None = None
    ) -> list[SleepDiaryEntryEntity]:
        query = (
            db.session.query(SleepDiaryEntry)
            .filter_by(patient_id=patient_id)
            .order_by(SleepDiaryEntry.created_at.desc())
        )

        if limit is not None:
            query = query.offset(offset).limit(limit)

        results = query.all()

        return [
            SleepDiaryEntryEntity(
                id=str(r.id),
                patient_id=r.patient_id,
                sleep_duration=r.sleep_duration,
                bedtime=r.bedtime,
                awakenings=r.awakenings,
                medication=r.medication,
                created_at=r.created_at
            )
            for r in results
        ]

    def count_entries_by_patient_id(self, patient_id: int) -> int:
        return (
            db.session.query(SleepDiaryEntry)
            .filter_by(patient_id=patient_id)
            .count()
        )
