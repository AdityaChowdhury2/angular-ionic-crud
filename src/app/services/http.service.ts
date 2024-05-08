import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  getUsers(): any {
    const options: HttpOptions = {
      url: 'http://192.168.30.232:3000/users-info',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return from(CapacitorHttp.request(options));
  }
}
