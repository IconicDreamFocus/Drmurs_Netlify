import { createSlice, current } from "@reduxjs/toolkit";

export const futureStudioSlice = createSlice({
  name: "futureStudio",
  initialState: {
    goals: [
    ],
    diary: [],
  },
  reducers: {
    addMilestones: (state, action) => {
     state.goals.push(action.payload)
    },
    addDiaryContent: (state, action) => {
      state.diary.unshift(action.payload);
    },
    updateCompleted: (state, action) => {
      const { index1, index2, index3, value } = action.payload;
      console.log(current(state))
      state.goals[index1].milestones[index2].activities[index3].is_complete = value;
    },
  },
});

export const { addMilestones, addDiaryContent, updateCompleted } =
  futureStudioSlice.actions;

export default futureStudioSlice.reducer;

