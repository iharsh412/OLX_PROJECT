import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'chatUser',
  initialState: { userId:null },
  reducers: {
    setUserId: (state, action) => ({
      ...state,
      userId: action.payload,
    }),
  },
});

export const {setUserId } = loader.actions;

export default loader.reducer;
