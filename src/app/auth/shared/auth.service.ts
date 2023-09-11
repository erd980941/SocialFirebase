import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
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
      this.SetUserData(result.user);
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
    const userData:User={
      uid:user.uid,
      email:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
      emailVerified:user.emailVerified
    };
    return userRef.set(userData,{merge:true});
  }

  get isLoggedIn():boolean{
    const user=JSON.parse(localStorage.getItem('user')!);
    let userUid:string="";
    this.afAuth.user.subscribe((res)=>{
        userUid=res.uid;
        
    });
    
    return !!user && userUid!==user.uid ? true : false;
  }
}
