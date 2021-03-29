import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChatClient} from './chat-client';
import {ChatMessage} from './chat-message';
import {WelcomeDto} from './welcome.dto';
import {SocketChat} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatClient: ChatClient | undefined;

  constructor(private socket: SocketChat) { }

  sendMessage(msg: string): void{
    this.socket.emit('message', msg);
  }

  sendTyping(typing: boolean): void{
    this.socket.emit('typing', typing);
  }

  listenForMessages(): Observable<ChatMessage>{
    return this.socket
      .fromEvent<ChatMessage>('messages');
  }

  listenForClientTyping(): Observable<ChatClient>{
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }

  listenForClients(): Observable<ChatClient[]>{
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto>{
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForErrors(): Observable<string>{
    return this.socket
      .fromEvent<string>('error');
  }

  sendName(name: string): void{
    this.socket.emit('name', name);
  }

  getAllMessages(): Observable<ChatMessage[]>{
    return this.socket
      .fromEvent<ChatMessage[]>('allMessages');
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }

}
