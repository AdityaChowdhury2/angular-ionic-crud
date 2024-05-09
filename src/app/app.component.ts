import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  personAddOutline,
  personAddSharp,
  personOutline,
  personSharp,
} from 'ionicons/icons';
import { DatabaseService } from './services/database.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonicModule,
    IonicStorageModule,
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Create', url: '/user/create', icon: 'person-add' },
    // { title: 'Get', url: '/get', icon: 'person' },
    // { title: 'Outbox', url: '/category', icon: 'paper-plane' },
    { title: 'Users', url: '/all-users', icon: 'person' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private database: DatabaseService, private storage: Storage) {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      personAddOutline,
      personAddSharp,
      personOutline,
      personSharp,
    });
    this.initApp();
  }

  async initApp() {
    // await this.database.initializePlugin();
    await this.storage.create();
  }
}
