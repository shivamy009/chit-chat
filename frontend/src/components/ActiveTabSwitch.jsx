import { MessageSquareIcon, UsersIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/chatSlice";

function ActiveTabSwitch() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.chat.activeTab);

  return (
    <div className="p-3 mx-3 my-2">
      <div className="bg-slate-800/40 rounded-xl p-1.5 flex gap-1.5 border border-slate-700/30">
        <button
          onClick={() => dispatch(setActiveTab("chats"))}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === "chats"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/30"
          }`}
        >
          <MessageSquareIcon className="w-4 h-4" />
          <span>Messages</span>
        </button>

        <button
          onClick={() => dispatch(setActiveTab("contacts"))}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === "contacts"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/30"
          }`}
        >
          <UsersIcon className="w-4 h-4" />
          <span>Contacts</span>
        </button>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;
