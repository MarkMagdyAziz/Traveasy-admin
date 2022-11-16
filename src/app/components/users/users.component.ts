import { IUser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  subscribers: any[] = [];
  constructor(private userService: UserService, private toastr: ToastrService) {
    this.subscribers.push(
      this.userService.getAllUsers().subscribe((users) => {
        return (this.users = users);
      })
    );
  }

  ngOnInit(): void {}
  removeUser(userId: string | number) {
    this.userService.removeUser(userId).subscribe((message) => {
      this.toastr.success(`${message}`);
    });
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((element: any) => {
      element.unsubscribe();
    });
    console.log(this.users);
  }
}
