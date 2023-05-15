import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eposter: null,
    eConductorName: null,
    eConductorMail: null,
    eConductorContact: null,
    eDescription: null,
    eRules: null,
    query: null,
  },
  reducers: {
    createEvent: (state, action) => {
      state.eposter = action.payload.ad;
      state.eConductorName = action.payload.name;
      state.eConductorMail = action.payload.mail;
      state.eConductorContact = action.payload.contact;
      state.eDescription = action.payload.description;
      state.eRules = action.payload.rules;
    },
    addQuery: (state, action) => {
      state.query = action.payload.query;
    },
  },
});

export const { createEvent, addQuery } = eventSlice.actions;

export default eventSlice.reducer;
