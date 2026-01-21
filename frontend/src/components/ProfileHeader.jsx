import { useState, useRef } from "react";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-4 m-3 mb-0">
      <div className="bg-gradient-to-br from-cyan-500/10 via-slate-800/50 to-purple-500/10 rounded-2xl p-4 border border-slate-700/30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AVATAR */}
            <div className="relative">
              <button
                className="size-12 rounded-xl overflow-hidden relative group ring-2 ring-cyan-500/30 hover:ring-cyan-500/60 transition-all"
                onClick={() => fileInputRef.current.click()}
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="User image"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-xs font-medium">Edit</span>
                </div>
              </button>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800" />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* USERNAME & ONLINE TEXT */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">
                {authUser.fullName}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-green-400 text-xs font-medium">Active now</p>
              </div>
            </div>
          </div>

          {/* LOGOUT BTN */}
          <button
            className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-all group"
            onClick={logout}
            title="Logout"
          >
            <LogOutIcon className="size-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
