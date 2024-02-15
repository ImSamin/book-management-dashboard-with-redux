import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  token: string;
  name: string;
  username: string;
  _id: string;
}

const initialState: LoginState = {
  token: "",
  name: "",
  username: "",
  _id: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    resetLoginState(state) {
      state.token = "";
      state.name = "";
      state.username = "";
      state._id = "";
    },
  },
});

export const { setToken, setName, setUsername, resetLoginState } =
  loginSlice.actions;

export default loginSlice.reducer;
