import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ApiService } from '../shared/services/api.service';
import { TransactionHistory } from '../shared/models/model';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [NzTableModule, NgFor, DatePipe],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly userInfoService = inject(UserInfoService);
  transactionData: TransactionHistory[] = [];
  ngOnInit(): void {
    this.apiService
      .getTransactionHistory(this.userInfoService.getUserName())
      .subscribe((res) => {
        this.transactionData = res;
      });
  }
}
