import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api/api.service';
import{ UserService} from '../api/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { Post} from '../models/Post';
import {User} from '../models/User';

interface UserMap {
  [key: number] : User
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[]
  users: UserMap = {}
  
  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.apiService.getPosts().subscribe( (posts: Post[]) => {
      this.posts = posts
    })
  }



  newPostDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '50%',
      data: {
        title: 'Entrez un nouveau post'
      }
    })

    dialogRef.afterClosed().subscribe( (post: Post) => {
      if (post) {
        post.author = "Solen Cotel"
        post.datePublished = new Date()
        this.apiService.addPost(post).subscribe( (savedPost: Post) => {
          this.posts.push(savedPost)
        })
      }
    })
  }

  editPostDialog(id: number) {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '50%',
      data: {
        title: 'Modifier le post',
        post: this.posts.find(post => post.id == id)
      }
    })

    dialogRef.afterClosed().subscribe( (post: Post) => {
      if (post) {
        this.apiService.editPost(post,post.id).subscribe( (savedPost: Post) => {
          this.posts.splice(
            this.posts.findIndex(post => post.id === savedPost.id),
            1, savedPost)
        })
      }
    })
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe( result => {
      this.posts.splice(
        this.posts.findIndex(post => post.id === id),
        1
      )
    })
  }
}
