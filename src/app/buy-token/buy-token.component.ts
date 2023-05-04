import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-buy-token',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputNumberModule,
    NzMessageModule,
    NzInputModule
  ],
  templateUrl: './buy-token.component.html',
  styleUrls: ['./buy-token.component.scss'],
})
export class BuyTokenComponent {
  private readonly apiService = inject(ApiService);
  private readonly userInfoService = inject(UserInfoService);
  private readonly nzMessage = inject(NzMessageService);
  readonly buyTokenForm = new FormGroup({
    totalToken: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    totalPrice: new FormControl({
      value: 0,
      disabled: true
    }, {
      nonNullable: true
    }),
    note: new FormControl('', {
      nonNullable: true
    })
  });
  readonly fixedCost = 0.25;

  updateTotalPrice(totalToken: number): void {
    this.buyTokenForm.patchValue({
      totalPrice: totalToken * this.fixedCost
    })
  }

  submit(): void {
    if (this.buyTokenForm.invalid) {
      Object.values(this.buyTokenForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const { totalToken, totalPrice, note } = this.buyTokenForm.getRawValue();
    this.apiService
      .buyToken(this.userInfoService.getUserName(), totalToken, note, totalPrice)
      .subscribe((res) => {
        if (res.success) {
          this.nzMessage.success('Buy token successfully!!!');
          this.userInfoService.loadCurrentBalanceToken();
        }
      });
  }
}
