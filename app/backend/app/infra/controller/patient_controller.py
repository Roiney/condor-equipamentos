from flask import request
from flask_restx import Namespace, Resource
from marshmallow import ValidationError

from app.application.use_case.create_sleep_entry import CreateSleepEntryUseCase
from app.domain.dto.sleep_entry_dto import SleepDiaryEntryDTO
from app.domain.dto.sleep_entry_response_dto import SleepDiaryEntryResponseDTO
from app.infra.repository.sleep_diary_repository import SleepDiaryRepository

from app.interface.http.models.sleep_entry_request_model import (
   build_sleep_entry_request_model,
)

from app.interface.http.models.sleep_entry_response_model import (
    build_sleep_entry_response_model,
)


ns = Namespace("patient", description="Patient sleep diary entry registration")

sleep_entry_request_model = build_sleep_entry_request_model(ns)
sleep_entry_response_model = build_sleep_entry_response_model(ns)


@ns.route("/")
class SleepEntryResource(Resource):
    @ns.expect(sleep_entry_request_model)
    @ns.response(
        201,
        "Registro criado com sucesso",
        model=sleep_entry_response_model
    )
    @ns.response(400, "Erro de validação")
    def post(self):
        try:
            dto = SleepDiaryEntryDTO()
            validated_data = dto.load(request.json)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        use_case = CreateSleepEntryUseCase(SleepDiaryRepository())
        entry = use_case.execute(validated_data)

        response_dto = SleepDiaryEntryResponseDTO()
        return response_dto.dump(entry), 201
