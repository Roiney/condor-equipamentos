from flask import request
from flask_restx import Namespace, Resource
from app.application.use_case.get_all_patient_ids import (
    GetAllPatientIdsUseCase,
)
from app.application.use_case.get_patient_entries import (
    GetPatientEntriesUseCase,
)
from app.infra.repository.sleep_diary_repository import (
    SleepDiaryRepository,
)
from app.interface.http.models.patient_entries_response_model import (
    build_patient_entries_response_model
)
from app.interface.http.models.patient_response_model import (
    build_patient_list_response_model,
)


ns = Namespace(
    "doctor",
    description="Doctor access to patient sleep diary data"
)

# Registra os models no namespace real
patient_list_response_model = build_patient_list_response_model(ns)
patient_entries_response_model = build_patient_entries_response_model(ns)


@ns.route("/patients")
class PatientListResource(Resource):
    @ns.doc(params={
        "page": "Page number (default: 1)",
        "page_size": "Number of items per page (default: 10)"
    })
    @ns.response(
        200,
        "List of unique patient IDs with pagination",
        model=patient_list_response_model
    )
    def get(self):
        page = int(request.args.get("page", 1))
        page_size = int(request.args.get("page_size", 10))

        use_case = GetAllPatientIdsUseCase(SleepDiaryRepository())
        result = use_case.execute(page=page, page_size=page_size)

        return result, 200


@ns.route("/patient/<int:patient_id>/entries")
class PatientEntriesResource(Resource):
    @ns.doc(params={
        "page": "Page number (default: 1)",
        "page_size": "Number of items per page (default: 10)"
    })
    @ns.response(
        200,
        "Paginated list of sleep diary entries",
        model=patient_entries_response_model
    )
    def get(self, patient_id):
        page = int(request.args.get("page", 1))
        page_size = int(request.args.get("page_size", 10))

        use_case = GetPatientEntriesUseCase(SleepDiaryRepository())
        result = use_case.execute(
            patient_id=patient_id,
            page=page,
            page_size=page_size
        )

        return result, 200
