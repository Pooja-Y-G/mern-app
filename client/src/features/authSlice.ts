import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api/axios";

interface AuthState{
    token: string | null;
    loading: boolean
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading:false
}

export const login = createAsyncThunk("auth/login",
    async (data:{email:string, password:string})=>{
        const response = await api.post(
                "http://localhost:5000/auth/login",data
        );
        localStorage.setItem("token", response.data.token);
        return response.data
    }
);

const authSlice = createSlice({name:"auth", initialState, reducers:{},extraReducers:(builder)=>{
    builder.addCase(login.fulfilled, (state, action)=>{
        state.token = action.payload.token;
    })
}
});

export default authSlice.reducer;

