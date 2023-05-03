import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './shared/guard/guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    canMatch: [nonAuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./main/main.component').then((c) => c.MainComponent),
    canMatch: [authGuard],
    children: [
      {
        path: 'transaction-history',
        loadComponent: () =>
          import('./transaction-history/transaction-history.component').then(
            (c) => c.TransactionHistoryComponent
          ),
      },
      {
        path: 'buy-token',
        loadComponent: () =>
          import('./buy-token/buy-token.component').then(
            (c) => c.BuyTokenComponent
          ),
      },
      {
        path: 'play-game',
        loadComponent: () =>
          import('./games/games.component').then((c) => c.GamesComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction-history',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
