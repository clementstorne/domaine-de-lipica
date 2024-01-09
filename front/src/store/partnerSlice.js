import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PartnerService from "../services/PartnerService";

const initialState = {
  partner: null,
  partnersList: [],
  isLoading: false,
  error: null,
};

export const createPartner = createAsyncThunk(
  "partners/createPartner",
  async (credentials, thunkAPI) => {
    try {
      const res = await PartnerService.createPartner(credentials);
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

export const getAllPartners = createAsyncThunk(
  "partners/getAllPartners",
  async (thunkAPI) => {
    try {
      const res = await PartnerService.getAllPartners();
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

export const getSinglePartner = createAsyncThunk(
  "partners/getSinglePartner",
  async (credentials, thunkAPI) => {
    const eventId = credentials.id;
    try {
      const res = await PartnerService.getSinglePartner(eventId);
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

export const updatePartner = createAsyncThunk(
  "partners/updatePartner",
  async (credentials, thunkAPI) => {
    const eventId = credentials.get("id");
    try {
      const res = await PartnerService.updatePartner(eventId, credentials);
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

export const deletePartner = createAsyncThunk(
  "partners/deletePartner",
  async (credentials, thunkAPI) => {
    const eventId = credentials.id;
    try {
      const res = await PartnerService.deletePartner(eventId);
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

const partnerSlice = createSlice({
  name: "partners",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPartner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.partnersList = [action.payload.newPartner, ...state.partnersList];
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.partnersList = action.payload.partners;
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSinglePartner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSinglePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.partner = action.payload.partner;
      })
      .addCase(getSinglePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePartner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.partnersList = state.partnersList.map((partner) =>
          partner.id === action.payload.updatedPartner.id
            ? action.payload.updatedPartner
            : partner,
        );
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePartner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.partnersList = state.partnersList.filter(
          (partner) => partner.id !== action.meta.arg.id,
        );
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default partnerSlice.reducer;
