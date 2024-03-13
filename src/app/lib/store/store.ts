import { configureStore } from "@reduxjs/toolkit"
import { inventorySlice } from "./reducer/inventory";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [inventorySlice.name]: inventorySlice.reducer,
        },
        devTools: true,
    });
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']