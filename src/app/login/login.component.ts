import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
  ],
})
export class LoginComponent {
  private readonly apiService = inject(ApiService);
  private readonly userInfoService = inject(UserInfoService);
  private readonly router = inject(Router);
  readonly loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const { username } = this.loginForm.getRawValue();
    this.apiService.login(username).subscribe((res) => {
      if (res.success) {
        this.userInfoService.updateLoginStatus('auth');
        this.userInfoService.updateUserName(username);
        this.router.navigate(['']);
      }
    });
  }
}
