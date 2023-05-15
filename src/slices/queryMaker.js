import { createSlice } from "@reduxjs/toolkit";

export const queryMakerSlice = createSlice({
  name: "newsfeed",
  initialState: [
    {
      id: 1,
      query: "User1",
      idea: "Listen music",
      sug: ["sug1"],
    },
    {
      id: 2,
      query: "User 2",
      idea: "dance",
      sug: ["sug2"],
    },
  ],
  reducers: {
    addIdea: (state, action) => {
      const { id, idea } = action.payload;
      const theValue = state.find((e) => e.id === id).sug;
      theValue.push(idea);
    },
  },
});

export const { addIdea } = queryMakerSlice.actions;

export default queryMakerSlice.reducer;
