import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

type LoginStatus = 'auth' | 'unAuth';

//Service store user info. State will be store in memory, it will be cleared after refresh page
@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private readonly apiService = inject(ApiService);
  private loginStatus: LoginStatus = 'unAuth';
  private userName!: string;

  // Store balanceToken as stream
  private balanceToken$ = new BehaviorSubject<number>(0);

  loadCurrentBalanceToken() {
    this.apiService.getBalanceToken(this.getUserName()).subscribe(
      res => {
        this.balanceToken$.next(res.totalToken);
      }
    )
  }

  getValueOfBalanceToken(): number {
    return this.balanceToken$.value;
  }

  getBalanceToken(): Observable<number> {
    return this.balanceToken$.asObservable();
  }

  getUserName(): string {
    return this.userName;
  }

  updateUserName(username: string): void {
    this.userName = username;
  }

  getLoginStatus(): LoginStatus {
    return this.loginStatus;
  }

  updateLoginStatus(status: LoginStatus): void {
    this.loginStatus = status;
  }
}
