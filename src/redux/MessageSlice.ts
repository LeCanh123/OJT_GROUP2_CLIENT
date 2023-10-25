import { createSlice } from "@reduxjs/toolkit";
import { MessageType } from "../interface/Message";

const initialState: { data: null | undefined | MessageType[] } = { data: null };

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fixBug: (state, action) => {
      const messageId = action.payload;
      state.data = state.data.filter((message) => message.id !== messageId);
    },
  },
});

export const { fixBug } = messageSlice.actions;
export default messageSlice.reducer;