import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.authService.getUsers().subscribe((res:any)=>{
      this.users=res;
    })
  }

  startChat(user:UserModel){
    this.selectedUser=user;
  }

}
