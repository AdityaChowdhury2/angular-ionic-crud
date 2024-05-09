import { Component, OnDestroy, OnInit } from '@angular/core';
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
  IonIcon,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { pencilOutline, pencilSharp } from 'ionicons/icons';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonListHeader,
    IonMenuButton,
    IonButtons,
    IonIcon,
    RouterModule,
  ],
  standalone: true,
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[] = [];

  private usersSub: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private toastController: ToastController
  ) {
    addIcons({
      pencilOutline,
      pencilSharp,
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    console.log('I am here again');

    this.usersSub = this.userService.usersUpdated.subscribe(() => {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
      });
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  removeUser(id: string) {
    this.userService.removeUser(id)?.subscribe();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks

    this.usersSub.unsubscribe();
  }
}
