import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import ForwardMessageModal from "./ForwardMessageModal";
import { ForwardIcon } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    setDraggedMessage,
    draggedMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [forwardModalMessage, setForwardModalMessage] = useState(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDragStart = (e, message) => {
    setDraggedMessage(message);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", message._id);
  };

  const handleDragEnd = () => {
    setDraggedMessage(null);
  };

  const handleForwardMessage = (message) => {
    setForwardModalMessage(message);
  };

  return (
    <>
      {forwardModalMessage && (
        <ForwardMessageModal
          message={forwardModalMessage}
          onClose={() => setForwardModalMessage(null)}
        />
      )}
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"} group`}
                draggable={msg.senderId === authUser._id}
                onDragStart={(e) => handleDragStart(e, msg)}
                onDragEnd={handleDragEnd}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  } ${draggedMessage?._id === msg._id ? "opacity-50 scale-95" : ""} transition-all duration-200 cursor-move hover:shadow-lg`}
                >
                  {msg.senderId === authUser._id && (
                    <button
                      onClick={() => handleForwardMessage(msg)}
                      className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 rounded-full p-1.5"
                      title="Forward message"
                    >
                      <ForwardIcon className="w-4 h-4 text-slate-200" />
                    </button>
                  )}
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
