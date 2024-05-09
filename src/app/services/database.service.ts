import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

const DB_USERS = 'myUserDb';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  dateOfBirth: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private user: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {}

  async initializePlugin(): Promise<any> {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        mobileNumber TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL
      );
    `;

    return true;
  }

  // CRUD

  async loadUsers(): Promise<void> {
    const users = await this.db.query('SELECT * FROM users;');
    this.user.set(users.values || []);
  }

  async addUser(user: User) {
    const query = `INSERT INTO users (firstName, lastName, email, address, mobileNumber, dateOfBirth) VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.address}', '${user.mobileNumber}', '${user.dateOfBirth}')`;
    const result = await this.db.query(query);
    console.log(result);
    return result;
    // await this.db.run(
    //   'INSERT INTO users (firstName, lastName, email, address, mobileNumber, dateOfBirth) VALUES (?, ?, ?, ?, ?, ?);',
    //   [
    //     user.firstName,
    //     user.lastName,
    //     user.email,
    //     user.address,
    //     user.mobileNumber,
    //     user.dateOfBirth,
    //   ]
    // );
    // this.loadUsers();
  }

  async updateUserById(user: User): Promise<void> {
    this.loadUsers();
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.run('DELETE FROM users WHERE id = ?;', [id]);
    this.loadUsers();
  }

  getUsers(): WritableSignal<User[]> {
    return this.user;
  }
}
