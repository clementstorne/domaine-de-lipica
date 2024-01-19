import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import StableService from "../services/StableService";
import ImagesService from "../services/ImagesService";

const initialState = {
  stable: null,
  stablesList: [],
  isLoading: false,
  error: null,
};

export const createStable = createAsyncThunk(
  "stables/createStable",
  async (credentials, thunkAPI) => {
    try {
      const res = await StableService.createStable(credentials);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getAllStables = createAsyncThunk(
  "stables/getAllStables",
  async (thunkAPI) => {
    try {
      const res = await StableService.getAllStables();
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getSingleStable = createAsyncThunk(
  "stables/getSingleStable",
  async (credentials, thunkAPI) => {
    const stableId = credentials.id;
    try {
      const res = await StableService.getSingleStable(stableId);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getStableByUrl = createAsyncThunk(
  "stables/getStableByUrl",
  async (credentials, thunkAPI) => {
    const stableUrl = credentials.url;
    try {
      const res = await StableService.getStableByUrl(stableUrl);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateStable = createAsyncThunk(
  "stables/updateStable",
  async (credentials, thunkAPI) => {
    const stableId = credentials.get("id");
    try {
      const res = await StableService.updateStable(stableId, credentials);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteStable = createAsyncThunk(
  "stables/deleteStable",
  async (credentials, thunkAPI) => {
    const stableId = credentials.id;
    try {
      const res = await StableService.deleteStable(stableId);
      if (res.status >= 200 && res.status <= 209) {
        return;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const stableSlice = createSlice({
  name: "stables",
  initialState,
  reducers: {
    resetStable: (state) => {
      state.stable = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stablesList = [action.payload.newStable, ...state.stablesList];
      })
      .addCase(createStable.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllStables.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllStables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stablesList = action.payload.stables;
      })
      .addCase(getAllStables.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleStable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleStable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stable = action.payload.stable;
        state.stable.images = action.payload.stable.images.map(
          (image) => image.url,
        );
      })
      .addCase(getSingleStable.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStableByUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStableByUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stable = action.payload.stable;
        state.stable.images = action.payload.stable.images.map(
          (image) => image.url,
        );
      })
      .addCase(getStableByUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateStable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stablesList = state.stablesList.map((stable) =>
          stable.id === action.payload.updatedStable.id
            ? action.payload.updatedStable
            : stable,
        );
      })
      .addCase(updateStable.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteStable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stablesList = state.stablesList.filter(
          (stable) => stable.id !== action.meta.arg.id,
        );
      })
      .addCase(deleteStable.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStable } = stableSlice.actions;
export default stableSlice.reducer;
