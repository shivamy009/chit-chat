import { useEffect, useState, useMemo } from "react";
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
    unreadCounts,
  } = useSelector((state) => state.chat);

  const onlineUsers = useSelector((state) => state.auth.onlineUsers);

  const [dragOverUserId, setDragOverUserId] = useState(null);

  /* ---------------- FETCH CHATS ---------------- */
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  /* ---------------- SORTED CHATS ---------------- */
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const aIsOnline = onlineUsers.includes(a._id);
      const bIsOnline = onlineUsers.includes(b._id);
      const aUnread = unreadCounts[a._id] || 0;
      const bUnread = unreadCounts[b._id] || 0;

      // 1. Online users first
      if (aIsOnline && !bIsOnline) return -1;
      if (!aIsOnline && bIsOnline) return 1;

      // 2. Then by unread count (higher first)
      if (aUnread !== bUnread) return bUnread - aUnread;

      // 3. Keep original order
      return 0;
    });
  }, [chats, onlineUsers, unreadCounts]);

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
      {sortedChats.map((chat) => (
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

            {/* Unread Badge */}
            {unreadCounts[chat._id] > 0 && (
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center shadow-lg">
                  {unreadCounts[chat._id] > 99 ? "99+" : unreadCounts[chat._id]}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;
