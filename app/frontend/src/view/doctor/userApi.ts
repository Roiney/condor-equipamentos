import api from 'api/api';

interface GetAllPatientsParams {
  page: number;
  page_size: number;
}

interface GetAllPatientsResponse {
  patient_ids: number[];
  page: number;
  page_size: number;
  total: number;
}

export const getAllPatients = async ({
  page,
  page_size,
}: GetAllPatientsParams): Promise<GetAllPatientsResponse> => {
  const response = await api.get('/doctor/patients', {
    params: { page, page_size },
  });
  return response.data;
};

export const getPatientEntries = async (
  patientId: number,
): Promise<{
  entries: any[];
  page: number;
  page_size: number;
  total: number;
}> => {
  const response = await api.get(`/doctor/patient/${patientId}/entries`);
  return response.data;
};

export const getPatientStats = async (
  patientId: number,
): Promise<{
  sleep_duration: Record<string, number>;
  awakenings: Record<string, number>;
}> => {
  const response = await api.get(`/doctor/patient/${patientId}/stats`);
  return response.data;
};
