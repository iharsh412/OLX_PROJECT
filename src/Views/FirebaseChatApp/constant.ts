export interface MessageProps {
  id: string;
  text: string;
  createdAt: Date;
  user: string;
  room: string;
  senderId: string;
  receiverId: string;
  seen:boolean;
}
