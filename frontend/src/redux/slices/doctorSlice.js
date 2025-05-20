import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "https://doctor-appointment-module.onrender.com" || import.meta.env.VITE_API_URL;

export const fetchDoctors = createAsyncThunk(
    "doctor/fetchDoctors",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) return data.doctors;
            toast.error(data.message);
            return thunkAPI.rejectWithValue(data.message);
        } catch (error) {
            toast.error(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctors: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default doctorSlice.reducer;
