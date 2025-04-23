from flask_restx import fields


def build_sleep_entry_response_model(ns):
    return ns.model("SleepEntryResponse", {
        "id": fields.String(description="Entry UUID"),
        "patient_id": fields.Integer(description="Patient ID"),
        "sleep_duration": fields.Float(description="Hours slept"),
        "bedtime": fields.String(description="Bedtime in HH:MM format"),
        "awakenings": fields.Integer(description="Number of awakenings"),
        "medication": fields.Boolean(
            description="Used medication (true/false)"
        ),
        "created_at": fields.DateTime(
            description="Timestamp of entry creation"
        )
    })
