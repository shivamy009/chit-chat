import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, forwardMessage, draggedMessage } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [dragOverUserId, setDragOverUserId] = useState(null);

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

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

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
            dragOverUserId === contact._id 
              ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 scale-[1.02] ring-2 ring-cyan-400/50 shadow-lg" 
              : "bg-slate-800/40 hover:bg-slate-800/60 hover:shadow-md"
          }`}
          onClick={() => setSelectedUser(contact)}
          onDragOver={(e) => handleDragOver(e, contact._id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, contact)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-slate-700/50 group-hover:ring-cyan-500/50 transition-all">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className="w-full h-full object-cover" />
              </div>
              {onlineUsers.includes(contact._id) && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-medium text-sm truncate group-hover:text-white transition-colors">
                {contact.fullName}
              </h4>
              <p className="text-slate-500 text-xs truncate mt-0.5">
                {onlineUsers.includes(contact._id) ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
