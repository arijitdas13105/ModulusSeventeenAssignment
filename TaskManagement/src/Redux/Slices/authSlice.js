import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isAuthenticated:false,
        userToken:null,
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.userToken=action.payload;
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.userToken=null;
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer