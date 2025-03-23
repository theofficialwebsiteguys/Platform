import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3333'; // Replace with your server URL
  private newMessageSubject = new Subject<any>();
  private messagesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.socket = io(this.SERVER_URL);

    // Listen for incoming messages
    this.socket.on('receive-message', (message) => {
      this.newMessageSubject.next(message); // Emit the new message
    });
  }

  joinRoom(userId: number) {
    console.log('Joining room for userId:', userId);
    this.socket.emit('join-room', userId);
  }

  sendMessage(message: { senderId: number; receiverId: number; content: string }) {
    console.log('Sending message:', message);
    this.socket.emit('send-message', message);
  }

  getMessages(): Observable<any> {
    return this.newMessageSubject.asObservable(); // Observable for single messages
  }

  getChatHistory(senderId: number, receiverId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.SERVER_URL}/api/messages/${senderId}/${receiverId}`);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
