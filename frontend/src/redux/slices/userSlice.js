import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialToken = localStorage.getItem("token");

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token },
            });

            if (data.success) return data.userData;
            toast.error(data.message);
            return thunkAPI.rejectWithValue(data.message);
        } catch (error) {
            toast.error(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: initialToken || null,
        currencySymbol: "₹",
        backendUrl: import.meta.env.VITE_BACKEND_URL,
        userData: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.userData = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                state.userData = null;
            });
    },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
