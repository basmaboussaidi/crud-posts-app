import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post} from '../models/Post';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${apiUrl}/posts`);
  }


  addPost(Post: Post) {
    return this.http.post(`${apiUrl}/posts`, Post)
    .pipe(
      catchError(this.handleError)
    )
  }

  editPost(Post: Post, id: number) {
    return this.http.put(`${apiUrl}/posts/${id}`, Post)
    .pipe(
      catchError(this.handleError)
    )
  }

  deletePost(id: number) {
    return this.http.delete(`${apiUrl}/posts/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: any) {
    console.log('caught mapping error and rethrowing', err);
    return throwError(err);
  }

}


