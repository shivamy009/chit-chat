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
      <div className="flex-1 px-4 md:px-6 overflow-y-auto py-6 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"} group`}
                draggable={msg.senderId === authUser._id}
                onDragStart={(e) => handleDragStart(e, msg)}
                onDragEnd={handleDragEnd}
              >
                <div className={`relative max-w-[75%] md:max-w-[60%] ${msg.senderId === authUser._id ? "ml-12" : "mr-12"}`}>
                  {msg.senderId === authUser._id && (
                    <button
                      onClick={() => handleForwardMessage(msg)}
                      className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all bg-slate-700/80 hover:bg-slate-600 rounded-lg p-2 backdrop-blur-sm"
                      title="Forward message"
                    >
                      <ForwardIcon className="w-3.5 h-3.5 text-slate-200" />
                    </button>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-lg ${
                      msg.senderId === authUser._id
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md"
                        : "bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-slate-700/50 rounded-bl-md"
                    } ${draggedMessage?._id === msg._id ? "opacity-50 scale-95" : ""} transition-all duration-200 cursor-move hover:shadow-xl`}
                  >
                    {msg.image && (
                      <div className="rounded-xl overflow-hidden mb-2">
                        <img src={msg.image} alt="Shared" className="w-full h-auto max-h-80 object-cover" />
                      </div>
                    )}
                    {msg.text && <p className="text-sm leading-relaxed break-words">{msg.text}</p>}
                    <div className={`flex items-center gap-1.5 mt-2 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
                      <p className="text-xs opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
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
