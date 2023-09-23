import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserModel } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  users:UserModel[];
  selectedUser:UserModel;
  currentUserId:string="";

  constructor(private authService:AuthService,private afAuth:AngularFireAuth){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.afAuth.currentUser.then((res)=>{
      if(!res)return;
      this.authService.getUsersWithoutCurrent(res.uid).subscribe((res:any)=>{
        this.users=res;
    })
    })
  }

  startChat(user:UserModel){
    this.selectedUser=user;
  }

}
