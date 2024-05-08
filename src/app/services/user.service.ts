import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { User } from './database.service';
import { map, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiEndpoint = 'http://192.168.30.232:3000/users-info';
  // private apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
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
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      return this.http.get<User[]>(url).pipe(map((response) => response));
    } else {
      return this.nativeHttp
        .getUsers()
        .pipe(map((response: any) => response.data));
    }
    // return from(
    //   Http.get({ url: url }).then((response) => JSON.parse(response.data))
    // );
    // return this.http.get<User[]>(url);
  }
}
