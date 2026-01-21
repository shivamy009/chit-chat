import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/PageLoader";

import { checkAuth, connectSocket, setOnlineUsers, disconnectSocket } from "./store/authSlice";
import { incrementUnreadCount } from "./store/chatSlice";
import { socketManager } from "./lib/socket";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  /* ---------------- REDUX STATE ---------------- */
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const { selectedUser } = useSelector((state) => state.chat);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  /* ---------------- SOCKET CONNECT ---------------- */
  useEffect(() => {
    if (authUser) {
      dispatch(connectSocket());
      
      const socket = socketManager.getSocket();
      if (socket) {
        socket.on("getOnlineUsers", (users) => {
          console.log("Received online users:", users);
          dispatch(setOnlineUsers(users));
        });

        // Global listener for new messages to update unread counts
        socket.on("newMessage", (newMessage) => {
          // Only increment unread if the message is not from the currently selected user
          if (!selectedUser || newMessage.senderId !== selectedUser._id) {
            dispatch(incrementUnreadCount(newMessage.senderId));
          }
        });
      }
    } else {
      dispatch(disconnectSocket());
    }

    return () => {
      const socket = socketManager.getSocket();
      if (socket) {
        socket.off("getOnlineUsers");
        socket.off("newMessage");
      }
    };
  }, [authUser, dispatch, selectedUser]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
