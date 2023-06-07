import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {updateUserInfo,userInfoById}  from '../api/user'

export const updateUserInfoAsync =   createAsyncThunk('user/updateUserInfo',
    async (payload,thunkAPi) =>{
        // console.log(payload,'数据');
        await updateUserInfo(payload.userId,payload.newUserInfo);
       const {data} = await userInfoById(payload.userId)
        thunkAPi.dispatch(updateUser(data))
    }
)
const userSlice = createSlice({
    name:'user',
    initialState:{
        isLogin:false,
        userInfo:{},
    },
    reducers:{
        login(state,{payload}){
            // console.log("登录",payload);
            state.userInfo = payload;
            state.isLogin = true;
        },
        loginOut(state,{payload}){
            // console.log("登出");
            state.userInfo = {};
            state.isLogin = false;
            localStorage.removeItem('token')
        },
        updateUser(state,{payload}){
            state.userInfo = payload;
        }
    }
})


export const {login,loginOut,updateUser}  = userSlice.actions;
export default userSlice;