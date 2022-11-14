import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthAPIServiceService } from 'src/app/services/auth-apiservice.service';
import { ICredentials } from '../../interfaces/icredentials';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  response: string = '';

  user: IUser = {} as IUser;
  constructor(private authService: AuthAPIServiceService) {}
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
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
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
        this.response = response.message;
        console.log(response);
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log('Registered Successfuly!'),
    };
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(observer);
    }
  }
}
