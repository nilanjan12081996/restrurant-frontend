import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../store/Api';
import errorHandler from '../store/ErrorHandler';


export const getRestrurant = createAsyncThunk(
  'getRestrurant',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/restaurant/list`);
      if (response?.data?.status_code === 200) {
        return response?.data;
      } else {
        let errors = errorHandler(response);
        return rejectWithValue(errors);
      }
    } catch (error) {
      let errors = errorHandler(error);
      return rejectWithValue(errors);
    }
  }
);

export const addRestrurant = createAsyncThunk(
  'addRestrurant',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/branch/add`,userInput);
      if (response?.data?.status_code === 201) {
        return response?.data;
      } else {
        let errors = errorHandler(response);
        return rejectWithValue(errors);
      }
    } catch (error) {
      let errors = errorHandler(error);
      return rejectWithValue(errors);
    }
  }
);

const initialState={
    loading:false,
    error:false,
    res:[],
    branchData:""
}
const RestrurantSlice=createSlice({
    name:"rest",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRestrurant.pending,(state)=>{
            state.loading=true
        })
        .addCase(getRestrurant.fulfilled,(state,{payload})=>{
            state.loading=false
            state.res=payload
            state.error=false
        })
        .addCase(getRestrurant.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        .addCase(addRestrurant.pending,(state)=>{
            state.loading=true
        })
        .addCase(addRestrurant.fulfilled,(state,{payload})=>{
            state.loading=false
            state.branchData=payload
            state.error=false
        })
        .addCase(addRestrurant.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }

})
export default RestrurantSlice.reducer;