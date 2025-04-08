import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { refresh: null, access: null, id: null, username: null },
  reducers: {
    updateAuthState: (_, action) => ({
      refresh: action.payload.refresh,
      access: action.payload.access,
      id: action.payload.id,
      username: action.payload.username,
    }),
    updateAuthToken: (state, action) => ({
      ...state,
      access: action.payload.access,
    }),
  },
});

export const { updateAuthState,updateAuthToken } = common.actions;

export default common.reducer;
