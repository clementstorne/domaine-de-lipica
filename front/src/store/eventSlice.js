import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import EventService from "../services/EventService";
import {
  sortEvents,
  filterPastEvents,
  filterFutureEvents,
} from "../utils/eventsUtils";

const initialState = {
  eventsList: [],
  pastEventsList: [],
  futureEventsList: [],
  nextEvents: [],
  isLoading: false,
  error: null,
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (credentials, thunkAPI) => {
    try {
      const res = await EventService.createEvent(credentials);
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

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (thunkAPI) => {
    try {
      const res = await EventService.getAllEvents();
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

export const updateEvent = createAsyncThunk(
  "events/updateEVent",
  async (credentials, thunkAPI) => {
    const eventId = credentials.id;
    try {
      const res = await EventService.updateEvent(eventId, credentials);
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

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (credentials, thunkAPI) => {
    const eventId = credentials.id;
    try {
      const res = await EventService.deleteEvent(eventId);
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

const eventSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.eventsList = [action.payload.newEvent, ...state.eventsList];
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.eventsList = sortEvents(action.payload.events);
        state.pastEventsList = filterPastEvents(state.eventsList);
        state.futureEventsList = filterFutureEvents(state.eventsList);
        state.nextEvents = state.futureEventsList.slice(0, 3);
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.eventsList = state.eventsList.map((event) =>
          event.id === action.payload.updatedEvent.id
            ? action.payload.updatedEvent
            : event,
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.eventsList = state.eventsList.filter(
          (event) => event.id !== action.meta.arg.id,
        );
        state.pastEventsList = filterPastEvents(state.eventsList);
        state.futureEventsList = filterFutureEvents(state.eventsList);
        state.nextEvents = state.futureEventsList.slice(0, 3);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
