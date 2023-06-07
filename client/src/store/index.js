import { configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import typeSlice from './typeSlice';
import issueSlice from './issueSlice';
import interviewSlice from './interviewSlice';

export default configureStore({
    reducer:{
        [userSlice.name]:userSlice.reducer,
        [typeSlice.name]:typeSlice.reducer,
        [issueSlice.name]:issueSlice.reducer,
        [interviewSlice.name]:interviewSlice.reducer,
    }
})