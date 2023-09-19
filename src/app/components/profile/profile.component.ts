import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from 'src/app/shared/model/post.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  posts:PostModel[]=[];
  updateInformationFrm:FormGroup


  constructor(
    public afAuth: AngularFireAuth, 
    private postService:PostService,
    private authService:AuthService,
    private formBuilder:FormBuilder){
      this.updateInformationFrm=this.formBuilder.group({
        username:["",Validators.required],
        firstName:["",Validators.required],
        lastName:["",Validators.required]
      })
    }
  
  ngOnInit(): void {
    this.afAuth.user.subscribe((res) => {
      this.user = res;
      // Firestore'dan kullanıcı bilgilerini al ve form kontrollerine ekle
      if (this.user) {
        this.authService.getUser(this.user.uid).subscribe((userData: any) => {
          if (userData) {
            this.updateInformationFrm.patchValue({
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName,
            });
          }
        });
      }
    });
    this.getPostsByUserId();
  }


  getPostsByUserId(){
    this.postService.getPostsByUserId().subscribe(res=>{
      this.posts=res;
    })
  }

  updateInformation() {
    if (this.user) {
      const userData = this.updateInformationFrm.value;
      this.authService.updateInformation(this.user.uid, userData).then(() => {
        console.log('Kullanıcı bilgileri güncellendi.');
      }).catch((error) => {
        console.error('Hata:', error);
      });
    }
  }
}
