import { Socket } from "socket.io-client";

export interface ChatContextType {
    socket: Socket | null;
    messages: { type: string; message: any }[];
    setMessages: React.Dispatch<React.SetStateAction<{ type: string; message: any }[]>>;
}