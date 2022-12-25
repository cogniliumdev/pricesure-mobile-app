import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: "counterSlice",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    }
});

export const { increment } = counterSlice.actions;
export { counterSlice };
export default counterSlice.reducer; 