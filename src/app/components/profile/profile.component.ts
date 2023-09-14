import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;


  constructor(public afAuth: AngularFireAuth){}
  
  ngOnInit(): void {
    this.afAuth.user.subscribe((res)=>{
      this.user=res;
      console.log(this.user);
    })
    
  }


}
