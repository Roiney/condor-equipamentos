from flask_restx import fields


def build_patient_list_response_model(ns):
    return ns.model("PatientListResponse", {
        "patient_ids": fields.List(fields.Integer),
        "page": fields.Integer,
        "page_size": fields.Integer,
        "total": fields.Integer
    })
