import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/database.service';
import { CommonModule } from '@angular/common';
import {
  IonTitle,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonToolbar,
  IonCardContent,
  IonListHeader,
  IonMenuButton,
  IonButtons,
  ToastController,
} from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [
    CommonModule,
    IonTitle,
    IonContent,
    IonToolbar,
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonListHeader,
    IonMenuButton,
    IonButtons,
  ],
  standalone: true,
})
export class UserComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    if (this.storageService.get('users')) {
      // await this.storageService.get('users')?.then((users) => {
      //   this.users = JSON.parse(users);
      //   console.log(users);
      // });
      // this.userService.getUsers().subscribe((users) => {
      //   this.users = users;
      //   if (users.length !== 0) {
      //     this.presentToast('Users fetched successfully');
      //   }
      // });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
