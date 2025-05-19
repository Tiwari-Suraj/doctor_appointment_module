import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./slices/doctorSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        doctors: doctorReducer,
        user: userReducer,
    }
});

export default store;
