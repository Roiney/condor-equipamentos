from marshmallow import Schema, fields


class SleepDiaryEntryResponseDTO(Schema):
    id = fields.String()
    patient_id = fields.Int()
    sleep_duration = fields.Float()
    bedtime = fields.Time(format="%H:%M")
    awakenings = fields.Int()
    medication = fields.Bool()
    created_at = fields.DateTime()
