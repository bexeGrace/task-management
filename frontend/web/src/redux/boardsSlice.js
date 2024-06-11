import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous thunk to fetch boards data
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await fetch("http://localhost:4000/api/tasks/tasks");
  const data = await response.json();
  console.log(data)
  return data.boards; // Adjust this based on your API response structure
});

export const addColumnAsync = createAsyncThunk(
  'columns/addColumn',
  async (columnData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/tasks/create-column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnData),
      });

      if (!response.ok) {
        throw new Error('Failed to add column');
      }

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBoardAsync = createAsyncThunk("boards/addBoard", async (board) => {
  const response = await fetch("http://localhost:4000/api/tasks/create-board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(board)
  });
  const data = await response.json();
  return data; // Adjust this based on your API response structure
});



const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Your existing reducers here
    addBoard: async (state, action) => {
      const isActive = state.boards.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.boards.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },
    deleteBoard: (state) => {
      const board = state.boards.find((board) => board.isActive);
      state.boards.splice(state.boards.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.boards.map((board, index) => {
        index === action.payload.index ? (board.isActive = true) : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } = action.payload;
      const task = { title, description, subtasks, status };
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const { title, status, description, subtasks, prevColIndex, newColIndex, taskIndex } =
        action.payload;
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBoardAsync.fulfilled, (state, action) => {
        // Add the new board to the state when the API call is successful
        state.boards.push(action.payload);
      })
      .addCase(addBoardAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addColumnAsync.fulfilled, (state, action) => {
        const board = state.boards.boards.find((board) => board.isActive);
        if (board) {
          board.columns.push(action.payload);
        }
      })
      .addCase(addColumnAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = boardsSlice.actions;

export default boardsSlice;
