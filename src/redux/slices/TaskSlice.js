import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasksByUser: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskData(state, action) {
      const { userId, task } = action.payload;
      if (!state.tasksByUser[userId]) {
        state.tasksByUser[userId] = [];
      }
      state.tasksByUser[userId].push(task);
    },
    TaskIsCompleted(state,action){
      // console.log("Response From Slice",action)
      const {userId}=action.payload;
      const taskIndex = state.tasksByUser[userId]?.findIndex(task => task.id );
      console.log("Response From Slice",state.tasksByUser[userId])
      if (taskIndex !== -1) {
        state.tasksByUser[userId][taskIndex].isCompleted = !state.tasksByUser[userId][taskIndex].isCompleted;
      }
    },
    // setUserTasks(state, action) {
    //   const { userId, tasks } = action.payload;
    //   state.tasksByUser[userId] = tasks;
    // },
  },
});

export const { addTaskData, setUserTasks,TaskIsCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;