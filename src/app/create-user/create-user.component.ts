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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, formatDate, isPlatformBrowser } from '@angular/common';
import { NetworkService } from '../services/network.service';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    CommonModule,
  ],
})
// implements OnInit
export class CreateUserComponent {
  calledFrom: string = '';
  id: string = '';
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
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private networkService: NetworkService,
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private userService: UserService // private localstorageService: LocalStorageService
  ) {
    this.calledFrom = this.route.snapshot.params['calledFrom'];
    if (this.calledFrom === 'edit') {
      this.calledFrom = this.route.snapshot.params['calledFrom'];
      this.id = this.route.snapshot.params['id'];
      this.userService.getUser(this.id).subscribe((user) => {
        this.userForm.get('firstName')?.setValue(user.firstName);
        this.userForm.get('lastName')?.setValue(user.lastName);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('mobileNumber')?.setValue(user.mobileNumber);
        this.userForm.get('address')?.setValue(user.address);
        this.userForm.get('dateOfBirth')?.setValue(user.dateOfBirth);
      });
    } else {
    }

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
        console.log('not mobile');
      });
    }
  }

  // ngOnInit() {}

  setDate(dateValue: any) {
    const date = new Date(dateValue);
    console.log(formatDate(date, 'yyyy-MM-dd', 'en'));
    console.log(this.userForm.errors);
  }

  updateData() {
    let user: User = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      address: '',
      dateOfBirth: '',
    }; // Initialize the 'user' variable
    console.log(this.userForm.value);
    Object.assign(user, this.userForm.value);
    this.userService.updateUser(user, this.id).subscribe({
      next: (success) => {
        console.log(success);
        this.presentToast('User Updated Successfully');
        this.userForm.reset();
        this.userForm.updateValueAndValidity();
        console.log(this.userForm.errors);
        this.userService.usersUpdated.next();
        this.router.navigate(['/all-users']);
      },
      error: (error) => {
        this.presentToast(error);
      },
    });
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
    Object.assign(user, this.userForm.value);
    if (netWorkStatus.connected) {
      if (this.storageService.get('users')) {
        this.storageService.get('users').subscribe((user) => {
          console.log(user);
        });
        this.storageService.get('users').subscribe((users) => {
          const usersArray = users ? JSON.parse(users) : [];

          usersArray.push(user);

          this.userService.addUser(usersArray).subscribe({
            next: (success) => {
              console.log(success);
              this.presentToast('User Saved Successfully');
              this.userForm.reset();
              this.userForm.updateValueAndValidity();
              console.log(this.userForm.errors);
              this.storageService.remove('users');
              this.router.navigate(['/all-users']);
            },
            error: (error) => {
              this.presentToast(error);
            },
          });
        });
      } else {
        this.userService.addUser([user]).subscribe({
          next: (success) => {
            console.log(success);
            this.presentToast('User Saved Successfully');
            this.userForm.reset();
            this.userForm.updateValueAndValidity();
            this.userForm.get('dateOfBirth')?.setValue('');
            console.log(this.userForm.errors);
            this.router.navigate(['/all-users']);
          },
          error: (error) => {
            this.presentToast(error);
          },
        });
      }
    } else {
      this.storageService.get('users').subscribe((users) => {
        const usersArray = users ? JSON.parse(users) : [];

        usersArray.push(user);

        this.storageService.set('users', JSON.stringify(usersArray));
        this.userForm.reset();
        this.userForm.get('dateOfBirth')?.setValue('');
        this.router.navigate(['/all-users']);
      });
    }
  }
}
