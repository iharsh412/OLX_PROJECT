export interface MessageProps {
  id: string;
  text: string;
  createdAt: Date;
  user: string;
  room: string;
  senderId: string;
  receiverId: string;
  seen: boolean;
}
export const CLASSNAME = {
  NO_USERS: 'no_users',
  CHAT_APP: 'chat-app',
  USER_WRAPPER: 'userWrapper',
  USER: 'user',
  USER_LIST: 'user-list',
  MESSAGE_WRAPPER: 'message-wrapper',
  MESSAGE_LIST: 'message-list',
  NO_MSG: 'no_message',
  MESSAGE_TEXT: 'message-text',
  MESSAGE_TIME: 'message-time',
  INPUT_WRAPPER: 'input-wrapper',
  MESSAGE_INPUT: 'message-input',
  SEND_BUTTON: 'send-btn',
 USER_ITEM:"user-item",
 ACTIVE_USER:'activeUser',
 MESSAGE_ITEM:"message-item",
 SENT:'sent',
 RECEIVED:'received',
 TICK_STATUS:"tick-status",
 SEEN:"seen",
 MESSAGE:"message",
 UNREAD:"unreadcount",

};
export const TEXT = {
  MESSAGES:"Messages",
  USER: 'User',
  SEND: 'Send',
  TYPE_MESSAGE: 'Type a message',
  NO_MSG:"No messages yet. Say hello to start the conversation!",
  NO_CONVERSATIONS: "No conversations yet. Start chatting by connecting with seller!",
  SELECT_SELLER_ROOMID:
    'Select a seller roomId to message and unlock better deals, faster responses, and secure transactions!',
  ERROR:'Error sending message. Please try again later.'
  };
