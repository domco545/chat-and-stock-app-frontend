import {ChatClient} from './chat-client';
import {ChatMessage} from './chat-message';

export interface WelcomeDto{
  clients: ChatClient[];
  client: ChatClient;
  messages: ChatMessage[];
}
