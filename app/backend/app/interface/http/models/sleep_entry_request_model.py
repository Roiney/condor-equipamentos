from flask_restx import fields


def build_sleep_entry_request_model(ns):
    return ns.model("SleepEntryRequest", {
        "patient_id": fields.Integer(
            required=True,
            description="Patient ID"
        ),
        "sleep_duration": fields.Float(
            required=True,
            description="Hours slept"
        ),
        "bedtime": fields.String(
            required=True,
            example="22:30",
            description="Bedtime in HH:MM format"
        ),
        "awakenings": fields.Integer(
            required=True,
            description="Number of awakenings"
        ),
        "medication": fields.Boolean(
            required=True,
            description="Used medication (true/false)"
        )
    })
