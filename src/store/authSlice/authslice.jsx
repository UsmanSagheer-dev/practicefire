import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config/firebase";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        Auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers:(builder)=>{
    builder
     .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
     .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {logout}=authSlice.actions;
export default authSlice.reducer;
