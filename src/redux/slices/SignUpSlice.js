// features/signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users:[],
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupData(state, action) {
      console.log(" Reducer",state)
      state.users.push(action.payload);
    },
    updatePassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const userToUpdate = state.users.find(user => user.email === email);
      if (userToUpdate) {
        userToUpdate.password = newPassword;
      }
    },
    signOut :(state, action) => {
      const { userId } = action.payload;
      if (state.users[userId]) {
        state.users[userId] = null;
      }
    },
  },
});

export const { setSignupData, updatePassword,signOut } = signupSlice.actions;
export default signupSlice.reducer;
