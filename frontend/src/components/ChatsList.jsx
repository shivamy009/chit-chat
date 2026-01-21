import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

import {
  fetchChats,
  setSelectedUser,
} from "../store/chatSlice";
import { forwardMessage } from "../store/chatSlice";

function ChatsList() {
  const dispatch = useDispatch();

  /* ---------------- REDUX STATE ---------------- */
  const {
    chats,
    isUsersLoading,
    draggedMessage,
  } = useSelector((state) => state.chat);

  const onlineUsers = useSelector((state) => state.auth.onlineUsers);

  const [dragOverUserId, setDragOverUserId] = useState(null);

  /* ---------------- FETCH CHATS ---------------- */
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  /* ---------------- DRAG HANDLERS ---------------- */
  const handleDragOver = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverUserId(userId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverUserId(null);
  };

  const handleDrop = async (e, user) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverUserId(null);

    if (draggedMessage) {
      dispatch(
        forwardMessage({
          message: draggedMessage,
          toUserId: user._id,
        })
      );
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  /* ---------------- UI ---------------- */
  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
            dragOverUserId === chat._id
              ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 scale-[1.02] ring-2 ring-cyan-400/50 shadow-lg"
              : "bg-slate-800/40 hover:bg-slate-800/60 hover:shadow-md"
          }`}
          onClick={() => dispatch(setSelectedUser(chat))}
          onDragOver={(e) => handleDragOver(e, chat._id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-slate-700/50 group-hover:ring-cyan-500/50 transition-all">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {onlineUsers.includes(chat._id) && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-medium text-sm truncate group-hover:text-white transition-colors">
                {chat.fullName}
              </h4>
              <p className="text-slate-500 text-xs truncate mt-0.5">
                {onlineUsers.includes(chat._id) ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;
