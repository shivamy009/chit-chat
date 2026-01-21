import { MessageCircleIcon, SparklesIcon, ArrowLeftIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
      
      <div className="relative z-10 max-w-md">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-slate-700/30 shadow-xl">
            <MessageCircleIcon className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="absolute -top-2 -right-2">
            <SparklesIcon className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Start a Conversation
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Select a contact from the sidebar to begin chatting. Share messages, images, and connect in real-time.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-cyan-400/60 text-sm">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Choose a chat to get started</span>
        </div>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
