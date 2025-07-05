import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-chatot',
  templateUrl: './chatot.component.html',
  styleUrls: ['./chatot.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChatotComponent implements AfterViewInit, OnDestroy {
  
  // Chat functionality
  messages: { text: string, isUser: boolean }[] = [
    { text: 'Hey there! I\'m Esprit, your friendly AI buddy. What\'s on your mind?', isUser: false }
  ];
  userMessage: string = '';
  isBotTyping: boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // Chat functionality
    this.scrollToBottom();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, isUser: true });
      const messageToSend = this.userMessage;
      this.userMessage = '';
      this.isBotTyping = true;
      this.scrollToBottom();
      
      this.http.post('http://localhost:8083/api/chatbot/prompt', messageToSend, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'  // <-- important pour recevoir du texte brut
      }).subscribe({
        next: (response: string) => {
          this.isBotTyping = false;
          this.messages.push({ text: response, isUser: false });
          this.scrollToBottom();
        },
        error: (error) => {
          this.isBotTyping = false;
          this.messages.push({ text: 'Oops, something went wrong! Please try again.', isUser: false });
          this.scrollToBottom();
          console.error('Chatbot API error:', error);
        }
      });
    }
  }

  private scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}
