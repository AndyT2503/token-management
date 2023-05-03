export interface Response {
  success: boolean
}

export interface BalanceToken {
  totalToken: number;
}

export interface GameDetail {
  name: string;
  description: string;
  token: number;
}

export interface TransactionHistory {
  id: number;
  action: string;
  numberOfTokens: number; //Number of token used or buy
  balanceToken: number; //Balance token after used or buy
  transactionTime: string; // Format ISOstring '2023-05-03T10:07:06.538Z'
}
