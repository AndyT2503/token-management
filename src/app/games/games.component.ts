import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameDetail } from '../shared/models/model';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: true,
  imports: [NgFor, NzMessageModule, NzCardModule],
})
export class GamesComponent {
  private readonly apiService = inject(ApiService);
  private readonly userInfoService = inject(UserInfoService);
  private readonly nzMessage = inject(NzMessageService);
  readonly gameData: GameDetail[] = [
    {
      name: 'Game A',
      description: 'Play Game with only 4 tokens',
      token: 4,
    },
    {
      name: 'Game B',
      description: 'Play Game with only 2 tokens',
      token: 2,
    },
  ];

  playGame(game: GameDetail) {
    const currentBalanceToken = this.userInfoService.getValueOfBalanceToken();
    if (currentBalanceToken < game.token) {
      this.nzMessage.error("You don't have enough tokens to play this game");
      return;
    }
    this.apiService.playGame(
      this.userInfoService.getUserName(),
      game.token,
      game.name
    ).subscribe(
      (res) => {
        if (res.success) {
          this.nzMessage.success('Submit Token to play this game successfully!!');
          this.userInfoService.loadCurrentBalanceToken();
        }
      }
    );
  }
}
