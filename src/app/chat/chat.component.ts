import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  messages: { text: string; type: 'sent' | 'received'; timestamp: string }[] = [];
  newMessage: string = '';
  userId!: number; // Current logged-in user ID
  receiverId: number = 34; // Receiver's ID (replace with dynamic value)

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
    // Get current user ID from AuthService
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userId = user.id;

        // Join the user's room
        this.chatService.joinRoom(this.userId);

        // Fetch chat history
        this.chatService.getChatHistory(this.userId, this.receiverId).subscribe((history) => {
          this.messages = history.map((msg) => ({
            text: msg.content,
            type: msg.senderId === this.userId ? 'sent' : 'received',
            timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));

          // Scroll to the bottom after loading history
          this.scrollToBottom();
        });
      }
    });

    // Subscribe to real-time single messages
    this.chatService.getMessages().subscribe((newMessage) => {
      const formattedMessage: { text: string; type: 'sent' | 'received'; timestamp: string } = {
        text: newMessage.content,
        type: newMessage.senderId === this.userId ? 'sent' : 'received', // Explicitly use 'sent' or 'received'
        timestamp: new Date(newMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      

      // Append the new message to the existing history
      this.messages.push(formattedMessage);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
  }

  ngAfterViewInit() {
    // Scroll to bottom after the view has been initialized
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        senderId: this.userId,
        receiverId: this.receiverId,
        content: this.newMessage,
      };

      // Send the message
      this.chatService.sendMessage(message);

      // Add the message to the local array
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages.push({ text: this.newMessage, type: 'sent', timestamp });

      // Clear the input
      this.newMessage = '';

      // Scroll to the bottom for sent messages
      this.scrollToBottom();
    }
  }

  ngOnDestroy() {
    // Disconnect the socket
    this.chatService.disconnect();
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      const element = this.chatMessagesContainer.nativeElement;
  
      // Add a delay to ensure the DOM has rendered
      setTimeout(() => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth', // Smooth scrolling
        });
        console.log('Scrolled to:', element.scrollTop, 'Total height:', element.scrollHeight);
      }, 100);
    }
  }
  
  
}
