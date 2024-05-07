import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor() {}

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    return status;
  }
}
