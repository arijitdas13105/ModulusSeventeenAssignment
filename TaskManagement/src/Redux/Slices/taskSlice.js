import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalTasks: 0,
  pendingTasksCount: 0,
  completedTasksCount: 0,
  completionRate: 0, 
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskStats: (state, action) => {
      const { totalTasks, pendingTasksCount, completedTasksCount } = action.payload;

      state.totalTasks = totalTasks;
      state.pendingTasksCount = pendingTasksCount;
      state.completedTasksCount = completedTasksCount;

      state.completionRate = totalTasks > 0 
        ? Math.floor((completedTasksCount / totalTasks) * 100) 
        : 0;
    },
  },
});

export const { setTaskStats } = taskSlice.actions;

export default taskSlice.reducer;
