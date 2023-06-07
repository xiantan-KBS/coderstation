import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {getType}  from '../api/type'


export const fetchTypeList = createAsyncThunk('type/fetchTypeList',
    async (_,thunkApi) =>{
        // console.log("_>>>>>",_); //dispatch触发调用传入的参数
        // console.log('thunkApi>>>',thunkApi);   //当前切片对象，里头有dispatch方法
        const {data} = await getType();
        //方法一配合dispatch，reducer使用
        // thunkApi.dispatch(setTypeList(data))  
        //方法二
        return data;
    }
)



const typeSlice = createSlice({
    name:'type',
    initialState:{
        typeList :[],
        typeId:'all',
        bookTypeId:"all",
    },
    reducers:{
        setTypeList(state,{payload}){
            state.typeList = payload;
        },
        updateTypeId(state,{payload}){
            state.typeId = payload;
        },
        updateBookTypeId(state,{payload}){
            state.bookTypeId = payload;
        }
    },
    //方法一，即将弃用
    // extraReducers:{
    //     [fetchTypeList.fulfilled](state,{payload}){
    //         state.typeList = payload;
    //     }
    // },
    //方法二，builder对象调用action
    extraReducers(builder){
        builder.addCase(fetchTypeList.fulfilled,(state,{payload})=>{
            state.typeList = payload;
        })
    }
})


export default  typeSlice;
export const {updateTypeId,updateBookTypeId} = typeSlice.actions;
// const {setTypeList}  = typeSlice.actions;


