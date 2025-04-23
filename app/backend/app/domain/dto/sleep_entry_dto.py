from marshmallow import Schema, fields, validates_schema, ValidationError


class SleepDiaryEntryDTO(Schema):
    patient_id = fields.Int(
        required=True,
        error_messages={"required": "Patient ID is required."}
    )
    sleep_duration = fields.Float(
        required=True,
        error_messages={"required": "Sleep duration is required."}
    )
    bedtime = fields.Time(
        required=True,
        format="%H:%M",
        error_messages={"required": "Bedtime is required (format: HH:MM)."}
    )
    awakenings = fields.Int(
        required=True,
        error_messages={"required": "Number of awakenings is required."}
    )
    medication = fields.Bool(
        required=True,
        error_messages={"required": "Medication usage must be specified."}
    )

    @validates_schema
    def validate_values(self, data, **kwargs):
        if data["sleep_duration"] <= 0:
            raise ValidationError(
                "Sleep duration must be greater than zero.",
                field_name="sleep_duration",
            )

        if data["awakenings"] < 0:
            raise ValidationError(
                "Number of awakenings cannot be negative.",
                field_name="awakenings",
            )
