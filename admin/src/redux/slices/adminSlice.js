import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendURL = "https://doctor-appointment-module.onrender.com" || import.meta.env.VITE_API_URL;

// Thunks
export const getAllDoctors = createAsyncThunk(
  "admin/getAllDoctors",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { aToken } = getState().admin;
      const headers = { headers: { aToken } };
      const { data } = await axios.post(backendURL + "/api/admin/all-doctors", {}, headers);
      if (data.success) return data.doctors;
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const changeAvailability = createAsyncThunk(
  "admin/changeAvailability",
  async (docId, { dispatch, rejectWithValue, getState }) => {
    try {
      const { aToken } = getState().admin;
      const headers = { headers: { aToken } };
      const { data } = await axios.post(
        backendURL + "/api/admin/change-availability",
        { docId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        dispatch(getAllDoctors()); // refresh list
        return data.message;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  "admin/getAllAppointments",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { aToken } = getState().admin;
      const headers = { headers: { aToken } };
      const { data } = await axios.get(backendURL + "/api/admin/appintments", headers);
      if (data.success) return data.appointment;
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getDashData = createAsyncThunk(
  "admin/getDashData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { aToken } = getState().admin;
      const headers = { headers: { aToken } };
      const { data } = await axios.get(backendURL + "/api/admin/dashboard", headers);
      if (data.success) return data.dashData;
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    aToken: localStorage.getItem("aToken") || null,
    backendURL,
    doctors: [],
    appointments: [],
    dashData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAToken: (state, action) => {
      state.aToken = action.payload;
      localStorage.setItem("aToken", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(getAllDoctors.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })
      .addCase(getDashData.fulfilled, (state, action) => {
        state.dashData = action.payload;
      });
  },
});

export const { setAToken } = adminSlice.actions;
export default adminSlice.reducer;
