import { IUser } from './../../interfaces/iuser';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: IUser = {} as IUser;

  constructor(private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
  }

  ngOnInit(): void {
    console.log('this.currentUser', this.currentUser);
  }
}
