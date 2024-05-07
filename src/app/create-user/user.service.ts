import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiEndpoint = 'http://localhost:3000/users-info';
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    const url = this.apiEndpoint + '/bulk-add-users';
    console.log({ users: [user] });
    return this.http.post<User>(url, { users: [user] });
  }
}
