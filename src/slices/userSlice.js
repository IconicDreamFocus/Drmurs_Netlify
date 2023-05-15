import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    email: null,
    user: null,
    updatedUser: null,
    username: null,
    password: null,
    avatar: null,
    gender: null,
    phone: null,
    hobby: null,
    about: null,
    interest: null,
    token:null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
      state.username = action.payload.user;
      state.password = action.payload.password;
      state.editedUser = null;
      state.about = null;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.password = null;
      state.editedUser = null;
      state.about = null;
    },
    signup1: (state, action) => {
      state.username = action.payload.username;
      state.user = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    signup2: (state, action) => {
      state.gender = action.payload.gender;
      state.phone = action.payload.phone;
      state.hobby = action.payload.hobby;
    },
    signup3: (state, action) => {
      state.interest = action.payload.interest;
    },
    signup4: (state, action) => {
      state.avatar = action.payload.avatar;
    },
    editprofile: (state, action) => {
      state.updatedUser = action.payload.user;
      state.about = action.payload.about;
    },
  },
});

export const {
  login,
  logout,
  signup1,
  signup2,
  signup3,
  signup4,
  editprofile,
} = userSlice.actions;

export default userSlice.reducer;
