import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, forwardMessage, draggedMessage } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [dragOverUserId, setDragOverUserId] = useState(null);

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

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
      await forwardMessage(draggedMessage, user._id);
    }
  };

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-all ${
            dragOverUserId === chat._id ? "bg-cyan-500/30 scale-105 ring-2 ring-cyan-500" : ""
          }`}
          onClick={() => setSelectedUser(chat)}
          onDragOver={(e) => handleDragOver(e, chat._id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;
