import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInterviewTitle } from '../api/interview'

export const getInterviewTitleList = createAsyncThunk('interview/getInterviewList',
    async (_, thunkApi) => {
        const result = await getInterviewTitle();
        // console.log(result);
        return result.data
    }
)

const interview = createSlice({
    name: 'interview',
    initialState: {
        interviewTitleList: [],
    },
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(getInterviewTitleList.fulfilled,(state,{payload})=>{
            state.interviewTitleList = payload;
        })
    }
})


export default interview;