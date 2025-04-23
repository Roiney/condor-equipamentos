import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerPatientEntry } from './userApi';

interface PatientState {
  loading: boolean;
  error: string | Record<string, string[]> | null;
  success: boolean;
}

const initialState: PatientState = {
  loading: false,
  error: null,
  success: false,
};

export const submitPatientEntry = createAsyncThunk(
  'patient/submitEntry',
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = await registerPatientEntry(formData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.errors || 'Unexpected error');
    }
  },
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearPatientStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPatientEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitPatientEntry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitPatientEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPatientStatus } = patientSlice.actions;
export default patientSlice.reducer;
