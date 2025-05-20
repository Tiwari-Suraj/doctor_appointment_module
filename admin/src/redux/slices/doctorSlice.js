import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const backendUrl = import.meta.env.VITE_API_URL;

const backendUrl = "https://doctor-appointment-module.onrender.com" || import.meta.env.VITE_API_URL;


// Async Thunks
export const getAppointments = createAsyncThunk(
  "doctor/getAppointments",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { dToken } = getState().doctor;
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dToken } });
      if (data.success) return data.appointments.reverse();
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getDashdata = createAsyncThunk(
  "doctor/getDashdata",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { dToken } = getState().doctor;
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dToken } });
      if (data.success) return data.dashData;
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getProfileData = createAsyncThunk(
  "doctor/getProfileData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { dToken } = getState().doctor;
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dToken } });
      if (data.success) {
        return data.profileData;
      }
      toast.error(data.message);
      return rejectWithValue(data.message);
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    dToken: localStorage.getItem("dToken") || null,
    appointments: [],
    dashData: null,
    profileData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setDToken: (state, action) => {
      state.dToken = action.payload;
      localStorage.setItem("dToken", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(getDashdata.fulfilled, (state, action) => {
        state.dashData = action.payload;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.profileData = action.payload;
      });
  },
});

export const { setDToken } = doctorSlice.actions;
export default doctorSlice.reducer;
