/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */

interface MessageData {
  id: number;
  message: string;
  senderName?: string;
  timestamp?: number;
}

export default class Message {
  /**
   * Message object for organizing and storing current message data.
   */
  id: number;
  message: string;
  senderName?: string;
  timestamp?: number;
  constructor(messageData: MessageData) {
    this.id = messageData.id; // id of the sender (0 is reserved for "blue bubble")
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
    this.timestamp = messageData.timestamp || undefined;
  }
}
