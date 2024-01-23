import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CarouselService from "../services/CarouselService";

const initialState = {
  image: null,
  imagesList: [],
  isLoading: false,
  error: null,
};

export const createImage = createAsyncThunk(
  "images/createImage",
  async (credentials, thunkAPI) => {
    try {
      const res = await CarouselService.createImage(credentials);
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

export const getAllImages = createAsyncThunk(
  "images/getAllImages",
  async (thunkAPI) => {
    try {
      const res = await CarouselService.getAllImages();
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

export const getSingleImage = createAsyncThunk(
  "images/getSingleImage",
  async (credentials, thunkAPI) => {
    const imageId = credentials.id;
    try {
      const res = await CarouselService.getSingleImage(imageId);
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

export const updateImage = createAsyncThunk(
  "images/updateImage",
  async (credentials, thunkAPI) => {
    const imageId = credentials.get("id");
    try {
      const res = await CarouselService.updateImage(imageId, credentials);
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

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (credentials, thunkAPI) => {
    const imageId = credentials.id;
    try {
      const res = await CarouselService.deleteImage(imageId);
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

const imageSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    resetImage: (state) => {
      state.image = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.imagesList = [
          action.payload.newCarouselImage,
          ...state.imagesList,
        ];
      })
      .addCase(createImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.imagesList = action.payload.images;
      })
      .addCase(getAllImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.image = action.payload.image;
      })
      .addCase(getSingleImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.imagesList = state.imagesList.map((image) =>
          image.id === action.payload.updatedImage.id
            ? action.payload.updatedImage
            : image,
        );
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.imagesList = state.imagesList.filter(
          (image) => image.id !== action.meta.arg.id,
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetImage } = imageSlice.actions;
export default imageSlice.reducer;
