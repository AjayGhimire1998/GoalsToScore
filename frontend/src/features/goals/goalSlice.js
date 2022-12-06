import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalServices";

export const getUserGoals = createAsyncThunk(
  "goals/getUserGoals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.getUserGoals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create a new goal
export const createUserGoal = createAsyncThunk(
  "goal/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUserGoal = createAsyncThunk(
  "goal/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.deleteGoal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  goals: [],
  isGoalFormOpen: false,
  isError: false,
  // isFormSubmitError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
    openGoalForm: (state) => {
      state.isGoalFormOpen = true;
    },
    closeGoalForm: (state) => {
      state.isGoalFormOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createUserGoal.rejected, (state, action) => {
        state.isLoading = false;
        // state.isFormSubmitError = true;
        state.message = action.payload;
      })
      .addCase(getUserGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal._id !== action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUserGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, openGoalForm, closeGoalForm } = goalSlice.actions;
export default goalSlice.reducer;
