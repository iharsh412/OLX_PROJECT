import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'language',
  initialState: { language: 'ENGLISH' },
  reducers: {
    setLanguage: (state, action) => ({
      ...state,
      language: action.payload,
    }),
  },
});

export const { setLanguage } = loader.actions;

export default loader.reducer;
