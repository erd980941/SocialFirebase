import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from 'src/app/shared/model/post.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';
import { matchPassword } from 'src/app/shared/validator/match-password';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  posts: PostModel[] = [];
  changePasswordForm:FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private postService: PostService,
    private authService: AuthService,
    private formBuilder:FormBuilder
  ) {
    
    this.changePasswordForm = formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validators: [matchPassword()] })
  }

  ngOnInit(): void {
    
      this.getUser();
      this.getPostsByUserId();
    
  }

  getUser(){
    this.afAuth.user.subscribe((res:any) => {
      if(!res) return;
      this.authService.getUser(res.uid).subscribe((res:any)=>{
        if(res){
          this.user=res;
        }
      })
    });
  }

  getPostsByUserId() {
    this.postService.getPostsByUserId().subscribe((res) => {
      this.posts = res;
    });
  }

  updateInformation() {
     if (this.user) {
       this.authService.updateInformation(this.user.uid, this.user).then(() => {
         console.log('Kullanıcı bilgileri güncellendi.');
       }).catch((error) => {
         console.error('Hata:', error);
       });
     }
  }

  updatePhoto(file:File){
    if(file){
      this.authService.updatePhoto(file,this.user.uid);
    }
  }

  changePassword(formData:any){
    if(this.changePasswordForm.invalid) return;
    console.log(formData.newPassword);
    const newPassword=formData.newPassword;
    
    this.authService.changePassword(newPassword);

  }
}
