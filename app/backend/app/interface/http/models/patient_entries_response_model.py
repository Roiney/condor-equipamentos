from flask_restx import fields


def build_patient_entries_response_model(ns):
    sleep_entry_model = ns.model("SleepEntry", {
        "id": fields.String(description="Unique entry ID (UUID)"),
        "patient_id": fields.Integer(description="ID of the patient"),
        "sleep_duration": fields.Float(description="Hours slept"),
        "bedtime": fields.String(description="Bedtime (format HH:MM)"),
        "awakenings": fields.Integer(description="Number of awakenings"),
        "medication": fields.Boolean(
            description="Used medication (true/false)"
        ),
        "created_at": fields.DateTime(
            description="Timestamp of entry creation"
        )
    })

    return ns.model("PatientEntriesPaginatedResponse", {
        "entries": fields.List(fields.Nested(sleep_entry_model)),
        "page": fields.Integer(description="Current page number"),
        "page_size": fields.Integer(description="Number of items per page"),
        "total": fields.Integer(description="Total number of entries")
    })
