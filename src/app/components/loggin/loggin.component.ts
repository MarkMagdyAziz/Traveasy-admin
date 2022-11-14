import { AuthAPIServiceService } from './../../services/auth-apiservice.service';
import { IUser } from '../../interfaces/iuser';
import { ICredentials } from '../../interfaces/icredentials';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss'],
})
export class LogginComponent implements OnInit {
  credentials: ICredentials = {} as ICredentials;
  user: IUser = {} as IUser;
  constructor(private authService: AuthAPIServiceService) {}

  ngOnInit(): void {}
  logginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSubmit() {
    const observer = {
      next: (data: IUser) => {
        this.user = data;
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log('loggedIn', this.user),
    };
    if (this.logginForm.valid) {
      this.authService.loggin(this.logginForm.value).subscribe(observer);
    }
  }
}
