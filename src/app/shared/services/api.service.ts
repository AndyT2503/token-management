import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BalanceToken, Response, TransactionHistory } from '../models/model';
import { environment } from 'src/environments/environment';

//Service request API
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  login(username: string): Observable<Response> {
    //TODO: Uncomment it when have api endpoint
    // API should be POST method and take body with 1 field username
    // return this.httpClient.post<LoginResponse>('add api login here', {
    //   username,
    // });

    //TODO: Mock data. Remove it later
    return of({
      success: true,
    });
  }

  getBalanceToken(username: string): Observable<BalanceToken> {
    //TODO: Uncomment it when have api endpoint
    // API should be GET method and take queryParams username. E.g. 'https://api.tokenbalance.com?username=something'
    // return this.httpClient.get<BalanceToken>('add api get balance token here', {
    //   params: {
    //     username
    //   }
    // })

    //TODO: Mock data. Remove it later
    return of({
      totalToken: 10,
    });
  }

  buyToken(username: string, totalToken: number, note: string, totalPrice: number): Observable<Response> {
    //TODO: Uncomment it when have api endpoint
    // API should be POST method and take body with 2 field username and totalToken
    // return this.httpClient.post<Response>('add api buy token here', {
    //   username,
    //   totalToken,
    //   note,
    //   totalPrice
    // })

    //TODO: Mock data. Remove it later
    return of({
      success: true,
    });
  }

  playGame(username: string, totalToken: number, gameName: string): Observable<Response> {
    //TODO: Uncomment it when have api endpoint
    // API should be POST method and take body with 3 field username, totalToken, gameName
    // return this.httpClient.post<Response>('add api use token here', {
    //   username,
    //   totalToken,
    //   gameName
    // })

    //TODO: Mock data. Remove it later
    return of({
      success: true,
    });
  }

  getTransactionHistory(username: string): Observable<TransactionHistory[]> {
    //TODO: Uncomment it when have api endpoint
    // API should be GET method and take queryParams username. E.g. 'https://api.transactionhistory.com?username=something'
    // return this.httpClient.get<TransactionHistory[]>('add api get transaction here', {
    //   params: {
    //     username
    //   }
    // })

    //TODO: Mock data. Remove it later
    return of([
      {
        id: 1,
        action: 'Buy 10 token',
        numberOfTokens: 10,
        balanceToken: 10,
        transactionTime: '2023-05-03T10:07:06.538Z'
      },
      {
        id: 2,
        action: 'Play 5 token game abc',
        numberOfTokens: 5,
        balanceToken: 5,
        transactionTime: '2023-05-03T10:07:06.538Z'
      }
    ])
  }
}
