import { createSlice } from '@reduxjs/toolkit'

const connectionSlice = createSlice({
    name : "connections",
    initialState: null,
    reducers : {
        addConnection: (state, action)  => action.payload,
        removeConnecton:(state, action) => null
    },
});

export const {addConnection, removeConnecton} = connectionSlice.actions;

export default connectionSlice.reducer;