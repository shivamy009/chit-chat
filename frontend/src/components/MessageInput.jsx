import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  ImageIcon,
  SendIcon,
  XIcon,
  UploadCloudIcon,
} from "lucide-react";

import { sendMessage } from "../store/chatSlice";

function MessageInput() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef(null);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    dispatch(
      sendMessage({
        messageData: {
          text: text.trim(),
          image: imagePreview,
        },
        selectedUserId: selectedUser._id,
      })
    );

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- IMAGE PICK ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImageFile(file);
  };

  const processImageFile = (file) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Please select an image or video file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ---------------- DRAG & DROP ---------------- */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`p-4 border-t transition-all duration-200 bg-slate-800/30 backdrop-blur-sm ${
        isDraggingOver
          ? "bg-cyan-500/10 border-cyan-500/50 border-2"
          : "border-slate-700/30"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDraggingOver && (
        <div className="max-w-3xl mx-auto mb-3 text-center py-6 border-2 border-dashed border-cyan-500/50 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-sm">
          <UploadCloudIcon className="w-10 h-10 text-cyan-400 mx-auto mb-2 animate-bounce" />
          <p className="text-cyan-400 text-base font-semibold">
            Drop your media here
          </p>
          <p className="text-cyan-400/60 text-xs mt-1">
            Images and videos supported
          </p>
        </div>
      )}

      {/* Preview */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3">
          <div className="relative inline-block">
            <div className="rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-lg">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-24 object-cover"
              />
            </div>
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-end gap-2"
      >
        <div className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-1.5 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-transparent border-0 text-slate-100 placeholder-slate-500 focus:outline-none px-3 py-2 text-sm"
            placeholder="Type your message..."
          />
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 rounded-xl transition-all"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
