import { createSlice } from '@reduxjs/toolkit'


const issueSlice = createSlice({
    name: "issue",
    initialState: {
        current: 1,
    },
    reducers: {
        setCurrent(state, { payload }) {
            state.current = payload
        }
    }
})



export default issueSlice;
export const { setCurrent} = issueSlice.actions;