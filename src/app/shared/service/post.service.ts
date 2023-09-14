import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PostModel } from '../model/post.model';
import { User } from '../model/user.model';
import { PostUserModel } from '../model/post-user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    public ngZone: NgZone,
    public afs: AngularFirestore,
    public afauth:AngularFireAuth
  ) { }

  addPost(postContent: string) {
    this.afauth.currentUser.then((res) => {
      const post: PostModel = {
        userId: res.uid,
        content: postContent
      };
  
      const newPostRef:AngularFirestoreDocument<PostModel> = this.afs.collection('posts').doc();
      post.uid = newPostRef.ref.id; 
  
      newPostRef.set(post)
        .then(() => {
          console.log("Gönderi Başarıyla Paylaşıldı.")
        })
        .catch((err) => {
          console.log(err, "Gönderi Paylaşırken Hata Oluştu")
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  // getPosts(){
  //   return this.afs.collection('posts').valueChanges();
  // }

  //  getPosts():Observable<any[]>{
  //    return this.afauth.authState.pipe(
  //      switchMap((user:any)=>{
  //        if (user) {
  //          return this.afs.collection<any>('posts',(ref)=> ref.where('userId','==',user.uid)).valueChanges();
  //        }
  //        else {
  //          return [];
  //        }
  //      })
  //    )
  //  }

   getPosts1(): Observable<PostUserModel[]> {
    return this.afs.collection<PostModel>('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as PostModel;
          const id = action.payload.doc.id;
          console.log(data);
          return { id, ...data };
        });
      }),
      switchMap(posts => {
        const observables = posts.map(post => {
          return this.afs.doc(`users/${post.userId}`).valueChanges().pipe(
            map(user => ({ ...post, user } as PostUserModel))
          );
        });
        return forkJoin(observables);
      })
    );
  }

  getPosts(): Observable<PostUserModel[]> {
    return this.afs.collection<PostModel>('posts').snapshotChanges().pipe(
      switchMap(actions => {
        const observables = actions.map(action => {
          const data = action.payload.doc.data() as PostModel;

          return this.afs.doc<User>(`users/${data.userId}`).valueChanges().pipe(
            map(user => ({ ...data, user } as PostUserModel))
            
          );
        });
        
        return forkJoin(observables);
      })
    );
    
    
  }

  getUser():Observable<User[]>{
    return this.afs.collection<User>('users').valueChanges();
  }
  
}
