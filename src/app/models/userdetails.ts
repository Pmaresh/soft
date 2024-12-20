export interface UserDetailsDTO {
  username: string;
  accountNo: string;
  upiId: string;
  balance: number;
}

export interface TransactionSummaryDTO {
  id: number;
  fromAccount: string;
  toAccount: string;
  fromUpiId: string;
  toUpiId: string;
  amount: number;
  transactionType: string;
  remarks: string;
  transactionDate: string;
  balanceAfterTransaction: number;
}

export interface NEFTTransactionDTO {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transactionType: string;
  remarks: string;
  transactionDate: string;
  balanceAfterTransaction: number;
  transactionPassword: string;
}

export interface UPITransactionDTO {
  fromUpiId: string;
  toUpiId: string;
  amount: number;
  transactionType: string;
  remarks: string;
  transactionDate: string;
  balanceAfterTransaction: number;
  transactionPassword: string;
}