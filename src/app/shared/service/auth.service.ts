import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, filter, from, switchMap } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public afStorage:AngularFireStorage,
    public router: Router,
    public ngZone: NgZone 
  ) {
    afAuth.authState.subscribe((user)=>{
      if(user){
        this.userData=user;
        localStorage.setItem('user',JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }

  signUp(email:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log(result.user)
      this.SetUserData(result.user);
    }).catch((err)=>{
      console.log(console.log(err.message));
    })
  }
  signIn(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password).then((result)=>{
      //this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user)=>{
        if(user) this.router.navigate(['/']);
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  signOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
  SetUserData(user:any){
    const userRef:AngularFirestoreDocument<any>=this.afs.doc(`users/${user.uid}`);
    const userData:UserModel={
      uid:user.uid,
      email:user.email,
      username:user.displayName,
      photoURL:user.photoURL,
      emailVerified:user.emailVerified,
      firstName:null,
      lastName:null
    };
    return userRef.set(userData,{merge:true});
  }

  get isLoggedIn():boolean{
    const user=JSON.parse(localStorage.getItem('user')!);
    let userUid:string="";
    this.afAuth.user.subscribe((res)=>{
        if(res) userUid=res.uid;
        
    });
    
    return !!user && userUid!==user.uid ? true : false;
  }
  getUser(userId: string) {
    return this.afs.collection('users').doc(userId).valueChanges();
  }

  getUsers(){
    return this.afs.collection('users').valueChanges();
  }

  updateInformation(userId:string,userData:any){
    return this.afs.collection('users').doc(userId).update(userData);
  }

  updatePhoto(file:File,userId:string){
    const fileName=userId+"-profilePhoto";
    const newFile=new File([file],fileName,{type:file.type});


    const storageRef = this.afStorage.ref(`users/${userId}/${fileName}`);
    storageRef.put(newFile).then((snapshot)=>{
      snapshot.ref.getDownloadURL().then((downloadUrl)=>{
        this.afs.collection('users').doc(userId).update({photoUrl:downloadUrl}).then(()=>{
          console.log("Kullanıcının Fotoğrafı Başarıyla Güncellendi.")
        }).catch(()=>{console.log("Firestore güncelleme hatası")})
      })
    })
    
  }

   changePassword(newPassword: string) {
     this.afAuth.currentUser.then((user)=>{
       user.updatePassword(newPassword).then(()=>console.log("Şifre Değiştirildi")).catch(err=>console.log("şifre değiştirilirken hata oluştu")+err);
     },(err)=>{
       console.log("kullanıcı girişi yapılmadı"+err)
     })

   }

  

  // changePassword(newPassword: string): Observable<any> {
  //   return this.afAuth.user.pipe(
  //     switchMap((user:any)=>{
  //       return user.updatePassword(newPassword)
  //     })
  //   );

  // }
}
