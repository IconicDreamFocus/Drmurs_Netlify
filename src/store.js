import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice";
import newsfeedReducer from "./slices/newsfeedSlice";
import futureStudioSlice from "./slices/futureStudioSlice";
import ideaCreateSlice from "./slices/ideaCreate";
import queryMakerSlice from "./slices/queryMaker";

export default configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    newsfeed: newsfeedReducer,
    futureStudio: futureStudioSlice,
    ideaCreate: ideaCreateSlice,
    queryMaker: queryMakerSlice,
  },
});
