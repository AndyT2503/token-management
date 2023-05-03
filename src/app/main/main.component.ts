import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserInfoService } from '../shared/services/user-info.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgFor, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private readonly userInfoService = inject(UserInfoService);
  readonly username = this.userInfoService.getUserName();
  readonly balanceToken$ = this.userInfoService.getBalanceToken();
  readonly menuItems = [
    {
      link: '/transaction-history',
      title: 'Transaction History'
    },
    {
      link: '/buy-token',
      title: 'Buy Token'
    },
    {
      link: '/play-game',
      title: 'Play Game'
    }
  ]
}
