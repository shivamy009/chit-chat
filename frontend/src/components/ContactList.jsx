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
          className={`bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-all ${
            dragOverUserId === contact._id ? "bg-cyan-500/30 scale-105 ring-2 ring-cyan-500" : ""
          }`}
          onClick={() => setSelectedUser(contact)}
          onDragOver={(e) => handleDragOver(e, contact._id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
