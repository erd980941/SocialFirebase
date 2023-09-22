import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { MessageModel } from 'src/app/shared/model/message.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MessageService } from 'src/app/shared/service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnChanges {
  @Input() selectedUser: any;
  currentUser: any;
  senderUser:any;
  newMessageContent: string = '';
  messages:any[]
  constructor(private messageService: MessageService, private authService: AuthService,private afAuth: AngularFireAuth ) {
    this.messages=[];

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser) {
      // selectedUser değiştiğinde getMessages'i çağır
      
      this.getMessages();
    }
  }
  ngOnInit(): void {
    this.afAuth.user.subscribe((res:any) => {
      if(!res) return;
      this.authService.getUser(res.uid).subscribe((res:any)=>{
        if(res){
          this.currentUser=res;
          this.getMessages();
        }
      })
    });
    
  }

  getMessages() {
    if (this.currentUser && this.selectedUser) {
      // selectedUser ve loggedInUser varsa mesajları al
      this.messageService.getMessages(this.currentUser.uid, this.selectedUser.uid).subscribe((messages: any[]) => {
        this.messages = messages;
      });
    }
  }

  

  sendMessage() {

    if (this.newMessageContent.trim() === '') return;

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        const message: MessageModel = {
          senderId: user.uid, // Kullanıcı kimliğini buradan alın
          receiverId: this.selectedUser.uid, // Alıcı kullanıcının ID'si (varsayılan değil, kendi kullanıcınıza göre ayarlayın)
          content: this.newMessageContent,
          timestamp: new Date()
        };

        this.messageService.sendMessage(message).then(() => {
          this.newMessageContent = ''; // Mesaj alanını temizle
        });
      }
    });
  }
}
