import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailsDTO, TransactionSummaryDTO, NEFTTransactionDTO, UPITransactionDTO } from '../../models/userdetails';
 
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails: UserDetailsDTO = {
    username: '',
    accountNo: '',
    upiId: '',
    balance: 0
  };

  isModalVisible = false;
  modalMessage = '';
  transactions: TransactionSummaryDTO[] = [];
  dateRange = { startDate: '', endDate: '' };
  selectedSection: string = 'home';
  transactionSuccessMessage: string = '';
  transaction: Partial<NEFTTransactionDTO & UPITransactionDTO> = {
    fromAccount: '',
    toAccount: '',
    fromUpiId: '',
    toUpiId: '',
    amount: 0,
    transactionType: '',
    remarks: '',
    transactionDate: '',
    balanceAfterTransaction: 0,
    transactionPassword: '',
    
  };
 
  constructor(private dashboardService: DashboardService) {}
 
  ngOnInit(): void {
    this.fetchUserDetails();
  }
 
  fetchUserDetails(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const username = localStorage.getItem('username'); // Retrieve stored username
      if (username) {
        this.dashboardService.getUserDetails(username).subscribe(
          userDetails => {
            this.userDetails = userDetails;
            this.transaction.fromAccount = userDetails.accountNo;
            this.transaction.fromUpiId = userDetails.upiId;
          },
          error => {
            console.error('Error fetching user details:', error);
          }
        );
      }
    }
  }
 
  fetchTransactionHistory(): void {
    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.dashboardService.getTransactionHistoryCustom(this.userDetails.accountNo, this.userDetails.upiId, this.dateRange.startDate, this.dateRange.endDate).subscribe(
        transactions => {
          // Replace UPI IDs with account numbers
          this.transactions = transactions.map(transaction => ({
            ...transaction,
            fromAccount: transaction.fromUpiId ? this.userDetails.accountNo : transaction.fromAccount,
            toAccount: transaction.toUpiId ? this.userDetails.accountNo : transaction.toAccount
          }));
        },
        error => {
          console.error('Error fetching transaction history:', error);
        }
      );
    }
  }
 
  sendNeft(): void {
    const neftTransaction: NEFTTransactionDTO = {
      fromAccount: this.transaction.fromAccount!,
      toAccount: this.transaction.toAccount!,
      amount: this.transaction.amount!,
      transactionType: 'NEFT',
      remarks: this.transaction.remarks!,
      transactionDate: '',
      balanceAfterTransaction: 0,
      transactionPassword: this.transaction.transactionPassword!
    };
  
    this.dashboardService.performNeftTransaction(neftTransaction).subscribe(
      response => {
        console.log(response);
        this.transactionSuccessMessage = 'NEFT Transaction successful';
      },
      error => {
        console.error('Error performing NEFT transaction:', error);
        this.transactionSuccessMessage = 'NEFT Transaction failed';
      }
    );
  }
  
 
  sendUpi(): void {
    const upiTransaction: UPITransactionDTO = {
      fromUpiId: this.transaction.fromUpiId!,
      toUpiId: this.transaction.toUpiId!,
      amount: this.transaction.amount!,
      transactionType: 'UPI',
      remarks: this.transaction.remarks!,
      transactionDate: '',
      balanceAfterTransaction: 0,
      transactionPassword: this.transaction.transactionPassword!
    };
  
    this.dashboardService.performUpiTransaction(upiTransaction).subscribe(
      response => {
        console.log(response);
        this.transactionSuccessMessage = 'UPI Transaction successful';
      },
      error => {
        console.error('Error performing UPI transaction:', error);
        this.transactionSuccessMessage = 'UPI Transaction failed';
      }
    );
  }
 
  showSection(section: string): void {
    this.selectedSection = section;
  }
}
