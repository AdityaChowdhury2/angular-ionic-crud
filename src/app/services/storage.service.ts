import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string): Observable<any> {
    return from(this._storage?.get(key) || Promise.resolve(null));
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }
}
