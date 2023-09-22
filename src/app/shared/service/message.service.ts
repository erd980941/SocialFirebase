import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageModel } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  sendMessage(message: MessageModel) {
    return this.firestore.collection('messages').add(message);
  }
  getMessages(senderId: string, receiverId: string) {
    return this.firestore.collection('messages', ref =>
      ref.where('senderId', 'in', [senderId, receiverId])
         .where('receiverId', 'in', [senderId, receiverId])
         .orderBy('timestamp')
    ).valueChanges();
  }
}
