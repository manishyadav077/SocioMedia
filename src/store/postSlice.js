import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};


export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload)
    },
    
    }

  },
);


export const { addPost } = postSlice.actions;
export default postSlice.reducer;
