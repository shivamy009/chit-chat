import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/chatSlice";

function ChatHeader() {
  const dispatch = useDispatch();

  /* ---------------- REDUX STATE ---------------- */
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);

  const isOnline = onlineUsers.includes(selectedUser._id);

  /* ---------------- ESC KEY HANDLER ---------------- */
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        dispatch(setSelectedUser(null));
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [dispatch]);

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-800/60 backdrop-blur-sm border-b border-slate-700/30 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-slate-700/50">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold text-base">
              {selectedUser.fullName}
            </h3>

            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-slate-500"
                }`}
              />
              <p
                className={`text-xs font-medium ${
                  isOnline ? "text-green-400" : "text-slate-400"
                }`}
              >
                {isOnline ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
        >
          <XIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
