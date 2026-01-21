import { useState, useEffect } from "react";
import { XIcon, SearchIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function ForwardMessageModal({ message, onClose }) {
  const { allContacts, getAllContacts, forwardMessage } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  const filteredContacts = allContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleForward = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one contact");
      return;
    }

    try {
      for (const userId of selectedUsers) {
        await forwardMessage(message, userId);
      }
      toast.success(`Message forwarded to ${selectedUsers.length} contact(s)`);
      onClose();
    } catch (error) {
      toast.error("Failed to forward message");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-200">Forward Message</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => toggleUserSelection(contact._id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedUsers.includes(contact._id)
                    ? "bg-cyan-500/20 border-2 border-cyan-500"
                    : "bg-slate-700/30 hover:bg-slate-700/50 border-2 border-transparent"
                }`}
              >
                <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                  <div className="size-10 rounded-full">
                    <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
                  <p className="text-xs text-slate-400">{contact.email}</p>
                </div>
                {selectedUsers.includes(contact._id) && (
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-8">No contacts found</p>
          )}
        </div>

        {/* Message Preview */}
        {message && (
          <div className="p-4 border-t border-slate-700">
            <p className="text-xs text-slate-400 mb-2">Message to forward:</p>
            <div className="bg-slate-700/50 rounded-lg p-3">
              {message.image && (
                <img src={message.image} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />
              )}
              {message.text && <p className="text-sm text-slate-200">{message.text}</p>}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleForward}
            disabled={selectedUsers.length === 0}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Forward ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForwardMessageModal;
