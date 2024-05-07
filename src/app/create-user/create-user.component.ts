import { LocalStorageService } from './../services/local-storage.service';
import { User } from './../services/database.service';
import {
  IonItem,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { NetworkService } from '../services/network.service';
import { DatabaseService } from '../services/database.service';
import { UserService } from './user.service';
import { Platform } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  imports: [
    IonItem,

    IonInput,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonButton,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
// implements OnInit
export class CreateUserComponent {
  dateOfBirth: any;
  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(
      formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      Validators.required
    ),
  });
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private networkService: NetworkService,
    private databaseService: DatabaseService,
    private userService: UserService,
    private localstorageService: LocalStorageService
  ) {
    if (this.platform.is('capacitor')) {
      this.databaseService.initializePlugin().then((success) => {
        if (success) {
          console.log('Database Initialized');
        }
      });
    }
    if (this.platform.is('capacitor')) {
      this.presentToast('Capacitor');
    } else {
      this.platform.ready().then(() => {
        console.log('Mobile');
      });
    }
  }

  // ngOnInit() {}

  setDate(dateValue: any) {
    const date = new Date(dateValue);
    console.log(formatDate(date, 'yyyy-MM-dd', 'en'));

    console.log(typeof date);
  }

  async saveData() {
    let user: User = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      address: '',
      dateOfBirth: '',
    }; // Initialize the 'user' variable
    console.log(this.userForm.value);
    const netWorkStatus = await this.networkService.checkNetworkStatus();
    this.presentToast(netWorkStatus.connected ? 'Connected' : 'Not Connected');
    if (netWorkStatus.connected) {
      Object.assign(user, this.userForm.value);
      this.userService.addUser(user).subscribe({
        next: (success) => {
          console.log(success);
          this.presentToast('User Saved Successfully');
          this.userForm.reset();
        },
        error: (error) => {
          this.presentToast(error);
        },
      });
    }
    // if (netWorkStatus.connected) {
    //   this.presentToast('Connected to the internet');
    //   console.log('Connected to the internet');

    //   Object.assign(user, this.userForm.value);
    //   this.userService.addUser(user).subscribe({
    //     next: (success) => {
    //       console.log(success);
    //       this.presentToast('User Saved Successfully');
    //       this.userForm.reset();
    //     },
    //     error: (error) => {
    //       this.presentToast(error);
    //     },
    //   });
    // } else {
    //   this.presentToast(' Not Connected to the internet');
    //   console.log('Not connected to the internet');
    //   Object.assign(user, this.userForm.value);
    //   this.databaseService.addUser(user);
    // }
  }
}
