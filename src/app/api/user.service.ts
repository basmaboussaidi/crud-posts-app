import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../models/User';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


getUsers() {
    return this.http.get(`${apiUrl}/users`)
  }

addUser(User: User) {
  return this.http.post(`${apiUrl}/users`, User)
  .pipe(
    catchError(this.handleError))
}

editUser(User: User, id: number) {
  return this.http.put(`${apiUrl}/users/${id}`, User)
  .pipe(
    catchError(this.handleError))
}

deleteUser(id: number) {
  return this.http.delete(`${apiUrl}/users/${id}`)
  .pipe(
    catchError(this.handleError))
}

private handleError(err: any) {
  console.log('caught mapping error and rethrowing', err);
  return throwError(err);
}

}


