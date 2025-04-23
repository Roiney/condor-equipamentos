from flask_restx import fields


def build_patient_statistics_response_model(ns):
    stats_group = ns.model("StatsGroup", {
        "mean": fields.Float(description="Mean value"),
        "min": fields.Float(description="Minimum value"),
        "max": fields.Float(description="Maximum value"),
        "std": fields.Float(description="Standard deviation"),
    })

    return ns.model("PatientStatisticsResponse", {
        "sleep_duration": fields.Nested(stats_group),
        "awakenings": fields.Nested(stats_group),
    })
