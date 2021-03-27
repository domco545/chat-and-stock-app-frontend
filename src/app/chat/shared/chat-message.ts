import {ChatClient} from './chat-client';

export interface ChatMessage {
  message: string;
  sender: ChatClient;
  date?: string;
}
