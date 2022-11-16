import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthAPIServiceService } from 'src/app/services/auth-apiservice.service';
import { IUser } from '../../interfaces/iuser';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  response: string = '';
  user: IUser = {} as IUser;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: any;

  constructor(
    private authService: AuthAPIServiceService,
    private storageService: StorageService
  ) {}
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    ]),
  });
  ngOnInit(): void {}
  onSubmit() {
    const observer = {
      next: (response: any) => {
        console.log(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.response = response.message;
      },
      error: (err: Error) => {
        this.isSignUpFailed = true;
        this.errorMessage = err.message;
        alert(err.message);
      },
      complete: () => console.log('Registered Successfuly!'),
    };
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(observer);
    }
  }
}
