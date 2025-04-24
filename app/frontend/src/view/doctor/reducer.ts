import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllPatients, getPatientEntries, getPatientStats } from './userApi';

export const fetchPatients = createAsyncThunk(
  'doctor/fetchPatients',
  async ({
    page = 1,
    page_size = 10,
  }: {
    page?: number;
    page_size?: number;
  }) => {
    const response = await getAllPatients({ page, page_size });
    return response;
  },
);

export const fetchPatientEntries = createAsyncThunk(
  'doctor/fetchPatientEntries',
  async (patient_id: number) => {
    const response = await getPatientEntries(patient_id);
    return response.entries;
  },
);

export const fetchPatientStats = createAsyncThunk(
  'doctor/fetchPatientStats',
  async (patient_id: number) => {
    const response = await getPatientStats(patient_id);
    return response;
  },
);

interface PatientListState {
  loading: boolean;
  patient_ids: number[];
  total: number;
  page: number;
  page_size: number;
  error: string | null;

  // Dados detalhados
  entries: any[];
  stats: Record<string, any> | null;
}

const initialState: PatientListState = {
  loading: false,
  patient_ids: [],
  total: 0,
  page: 1,
  page_size: 10,
  error: null,

  entries: [],
  stats: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patient_ids = action.payload.patient_ids;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.page_size = action.payload.page_size;
      })
      .addCase(fetchPatients.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch patients';
      })

      // Entradas
      .addCase(
        fetchPatientEntries.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.entries = action.payload;
        },
      )

      // Estatísticas
      .addCase(
        fetchPatientStats.fulfilled,
        (state, action: PayloadAction<Record<string, any>>) => {
          state.stats = action.payload;
        },
      );
  },
});

export default doctorSlice.reducer;
