import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import doctorReducer from "./slices/doctorSlice";

const store = configureStore({
    reducer: {
       admin: adminReducer,
       doctor: doctorReducer,
    }
});

export default store;
