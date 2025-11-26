//For Register

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";


export const getCategory = createAsyncThunk(
    'getCategory',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('category-list', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)


//init state

const initialState = {
    error: null,
    loading: false,
    allCat: [],
}

const CategorySlice = createSlice(
    {
        name: "cat",
        initialState,
        reducers:{},
        extraReducers:(builder) => {
            builder.addCase(getCategory.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCategory.fulfilled,(state,{payload})=>{
                state.loading=false
                state.allCat=payload
                state.error=false
            })
            .addCase(getCategory.rejected,(state,{payload})=>{
               state.loading=false
               state.error=payload
            })
        }
    }
)

export default CategorySlice.reducer

