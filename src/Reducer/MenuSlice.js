import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../store/Api';
import errorHandler from '../store/ErrorHandler';


export const getMenu = createAsyncThunk(
  'getMenu',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/restaurant/menus?restaurant_id=${id}`);
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


export const addMenu = createAsyncThunk(
  'addMenu',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/menus/create`,userInput);
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


export const addMenuSection = createAsyncThunk(
  'addMenuSection',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/menus/add-menusections`,userInput);
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


export const getMenuSection = createAsyncThunk(
  'getMenuSection',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/restaurant/menus/${id}`);
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

// Fetch Tenant List All
export const getTenantListAll = createAsyncThunk(
  'getTenantListAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/tenant/list`);
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

export const addRestrurantBranh = createAsyncThunk(
  'addRestrurantBranh',
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


export const addRestrurant = createAsyncThunk(
  'addRestrurant',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/add`,userInput);
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



export const editRestrurant = createAsyncThunk(
  'editRestrurant',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/edit`,userInput);
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

export const updateRestrurant = createAsyncThunk(
  'updateRestrurant',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/restaurant/update`,userInput);
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


export const restrurantBranchList = createAsyncThunk(
  'restrurantBranchList',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/restaurant/branch/list/${id}`);
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

const initialState={
    loading:false,
    error:false,
    menus:[],
    addMenuData:"",
    restAddData:"",
    branchList:[],
    allTenantList:{},
    editRest:"",
    updateData:"",
    menuSectionData:"",
    allMenuSection:[]

}
const MenuSlice=createSlice({
    name:"menu",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMenu.pending,(state)=>{
            state.loading=true
        })
        .addCase(getMenu.fulfilled,(state,{payload})=>{
            state.loading=false
            state.menus=payload
            state.error=false
        })
        .addCase(getMenu.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        .addCase(addMenu.pending,(state)=>{
            state.loading=true
        })
        .addCase(addMenu.fulfilled,(state,{payload})=>{
            state.loading=false
            state.addMenuData=payload
            state.error=false
        })
        .addCase(addMenu.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
         .addCase(addRestrurant.pending,(state)=>{
            state.loading=true
        })
        .addCase(addRestrurant.fulfilled,(state,{payload})=>{
            state.loading=false
            state.restAddData=payload
            state.error=false
        })
        .addCase(addRestrurant.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        .addCase(restrurantBranchList.pending,(state)=>{
            state.loading=true
        })
        .addCase(restrurantBranchList.fulfilled,(state,{payload})=>{
            state.loading=false
            state.branchList=payload
            state.error=false
        })
        .addCase(restrurantBranchList.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        .addCase(getTenantListAll.pending,(state)=>{
            state.loading=true
        })
        .addCase(getTenantListAll.fulfilled,(state,{payload})=>{
            state.loading=false
            state.allTenantList=payload
            state.error=false
        })
        .addCase(getTenantListAll.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
           .addCase(editRestrurant.pending,(state)=>{
            state.loading=true
        })
        .addCase(editRestrurant.fulfilled,(state,{payload})=>{
            state.loading=false
            state.editRest=payload
            state.error=false
        })
        .addCase(editRestrurant.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
                 .addCase(updateRestrurant.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateRestrurant.fulfilled,(state,{payload})=>{
            state.loading=false
            state.updateData=payload
            state.error=false
        })
        .addCase(updateRestrurant.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
                   .addCase(addMenuSection.pending,(state)=>{
            state.loading=true
        })
        .addCase(addMenuSection.fulfilled,(state,{payload})=>{
            state.loading=false
            state.menuSectionData=payload
            state.error=false
        })
        .addCase(addMenuSection.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
                     .addCase(getMenuSection.pending,(state)=>{
            state.loading=true
        })
        .addCase(getMenuSection.fulfilled,(state,{payload})=>{
            state.loading=false
            state.allMenuSection=payload
            state.error=false
        })
        .addCase(getMenuSection.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }

})
export default MenuSlice.reducer;