import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

/* ------------------ ASYNC THUNKS ------------------ */

export const fetchContacts = createAsyncThunk(
  "chat/fetchContacts",
  async () => {
    const res = await axiosInstance.get("/messages/contacts");
    return res.data;
  }
);

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const res = await axiosInstance.get("/messages/chats");
  return res.data;
});

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId) => {
    const res = await axiosInstance.get(`/messages/${userId}`);
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ messageData, selectedUserId }, { getState, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageData
      );
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const forwardMessage = createAsyncThunk(
  "chat/forwardMessage",
  async ({ message, toUserId }, { rejectWithValue }) => {
    try {
      const forwardData = {
        text: message.text,
        image: message.image,
      };
      await axiosInstance.post(`/messages/send/${toUserId}`, forwardData);
      toast.success("Message forwarded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to forward message");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ------------------ SLICE ------------------ */

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    draggedMessage: null,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setDraggedMessage: (state, action) => {
      state.draggedMessage = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.allContacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(fetchChats.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const {
  setActiveTab,
  setSelectedUser,
  setDraggedMessage,
  addMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
