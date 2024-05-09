import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { User } from './database.service';
import { map, Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiEndpoint = 'http://192.168.30.232:3000/users-info';
  // private apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
  usersUpdated = new Subject<void>();
  constructor(
    private http: HttpClient,
    private nativeHttp: HttpService,
    private platform: Platform
  ) {}

  addUser(user: User[]): Observable<any> {
    const url = this.apiEndpoint + '/bulk-add-users';
    // console.log({ users: [user] });
    return this.http.post<User>(url, { users: user });
  }
  getUsers(): Observable<User[]> {
    const url = this.apiEndpoint;
    // if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
    return this.http.get<User[]>(url).pipe(
      map((response) => {
        return response;
      })
    );
    // } else {
    //   return this.nativeHttp
    //     .getUsers()
    //     .pipe(map((response: any) => response.data));
    // }
  }
  removeUser(id: string) {
    const url = this.apiEndpoint;
    if (id !== '') {
      return this.http.delete(url + '/' + id).pipe(
        map((response) => {
          this.usersUpdated.next();
          return response;
        })
      );
    }
    return null; // Add this line to return a value if the condition is not met
  }
  getUser(id: string): Observable<User> {
    const url = this.apiEndpoint + '/' + id;
    return this.http.get<User>(url);
  }
  updateUser(user: User, id: string): Observable<any> {
    const url = this.apiEndpoint + '/' + id;
    return this.http.patch<User>(url, user);
  }
}
