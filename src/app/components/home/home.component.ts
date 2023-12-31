import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostUserModel } from 'src/app/shared/model/post-user.model';
import { PostModel } from 'src/app/shared/model/post.model';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: PostUserModel[] = [];
  constructor( public postService:PostService ){
    
  }
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((res:any)=>{
      this.posts=res;
    },(err)=>{
      console.log(err);
    })
  }
}
