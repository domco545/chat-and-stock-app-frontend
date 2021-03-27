import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client';
import {ChatMessage} from './shared/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
  message = new FormControl('');
  nameFC = new FormControl('');
  messages: ChatMessage[] = [];
  unsubscribe$ = new Subject();
  clients$: Observable<ChatClient[]> | undefined;
  clientsTyping: ChatClient[] = [];
  chatClient: ChatClient | undefined;
  error$: Observable<string> | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();

    this.message.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe(value => {
        this.chatService.sendTyping(value.length > 0);
      });

    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        this.messages.push(message);
      });

    this.chatService.listenForClientTyping()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(chatClient => {
        if (chatClient.typing && !this.clientsTyping.find(c => c.id === chatClient.id)){
          this.clientsTyping.push(chatClient);
        }else {
          this.clientsTyping = this.clientsTyping.filter(c => c.id !== chatClient.id);
        }
      });

    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
      });
    if (this.chatService.chatClient){
      this.chatService.sendName(this.chatService.chatClient.name);
    }
  }

  sendMessage(): void{
    this.chatService.sendMessage(this.message.value);
    this.message.patchValue('');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendName(): void{
    if (this.nameFC.value){
      this.chatService.sendName(this.nameFC.value);
    }
  }
}
