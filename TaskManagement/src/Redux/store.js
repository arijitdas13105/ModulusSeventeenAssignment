import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./Slices/authSlice";
import taskSlice from "./Slices/taskSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        tasks: taskSlice
    },
});

export default store