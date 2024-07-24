import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasksByUser: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskData(state, action) {
      state.tasksByUser = action.payload;
    },
    TaskIsCompleted(state, action) {
      const {userId, taskIndex} = action.payload;
      if (!userId || taskIndex === undefined || taskIndex === null) {
        console.error('Invalid userId or taskIndex');
        return;
      }
      const userTasks = state.tasksByUser[userId];
      if (!userTasks || taskIndex >= userTasks.length || taskIndex < 0) {
        console.error('Invalid task index or user tasks not found');
        return;
      }
      console.log('Response From Slice', taskIndex);

      if (taskIndex !== -1) {
        userTasks[taskIndex].isCompleted = !userTasks[taskIndex].isCompleted;
      }
    },
  },
});

export const {addTaskData, setUserTasks, TaskIsCompleted} = tasksSlice.actions;
export default tasksSlice.reducer;
