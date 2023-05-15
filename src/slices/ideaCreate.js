import { createSlice } from "@reduxjs/toolkit";

export const ideaCreateSlice = createSlice({
  name: "ideaCreate",
  initialState: [
    {
      query: null,
      idea: null,
      idea26: null,
    },
  ],
  reducers: {
    addIdeaCreate: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addIdeaCreate } = ideaCreateSlice.actions;

export default ideaCreateSlice.reducer;
