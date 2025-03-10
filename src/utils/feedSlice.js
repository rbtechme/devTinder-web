import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newArray = state.filter((r)=> r._id !== action.payload);
      return newArray;
    },
    emptyFeed:(state, action) => null
  },
});

export const { addFeed, removeFeed,emptyFeed } = feedSlice.actions;

export default feedSlice.reducer;
