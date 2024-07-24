import { createSlice } from '@reduxjs/toolkit';

// interface SettingsState {
//   darkMode: boolean;
//   language: string;
//   currency: string;
//   Country: string | null;
// }

// const initialState: SettingsState = {
//   darkMode: false,
//   language: 'en',
//   currency: 'USD',
//   Country: null
// };

const adminSettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    language: 'en',
    currency: 'USD',
    Country: null
  },
  reducers: {
    switchAppMode: (state) => {
      state.darkMode = !state.darkMode; // Toggle darkMode
    }
  }
});

export const { switchAppMode } = adminSettingsSlice.actions;
export default adminSettingsSlice.reducer;
