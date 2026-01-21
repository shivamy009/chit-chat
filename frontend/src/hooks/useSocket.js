import { socketManager } from "../lib/socket";

export const useSocket = () => {
  return socketManager.getSocket();
};
