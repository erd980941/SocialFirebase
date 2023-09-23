import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageModel } from '../model/message.model';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  sendMessage1(){
    console.log("tetiklendi");
  }

  sendMessageFirestore(message: MessageModel) {
    console.log("Mesaj Ekleme Tetiklendi service");
    return this.firestore.collection('messages').add(message);

    
  }

  getMessages(senderId: string, receiverId: string) {
    
      return this.firestore.collection('messages', ref =>
      ref.where('senderId', 'in', [senderId, receiverId])
        .where('receiverId', 'in', [senderId, receiverId])
        .orderBy('timestamp')
    ).valueChanges().pipe(
      map((messages: any[]) => {
        // Alınan tüm mesajları işleyin ve yalnızca belirli bir kullanıcıya ait olanları filtreleyin
        return messages.filter(message => message.senderId !== message.receiverId);
      })
    );
  }
}
