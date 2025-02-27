import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: any | null;
} 
const storedAuth = localStorage.getItem("authState");
const initialState: AuthState = storedAuth ? JSON.parse(storedAuth) : { token: null, user: null };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token || state.token;
            state.user = { ...state.user, ...action.payload.user }; 
            localStorage.setItem("authState", JSON.stringify(state));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("authState");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
