import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users:UserModel[];
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.authService.getUsers().subscribe((res:any)=>{
      this.users=res;
      console.log(this.users)
    })
  }
}
