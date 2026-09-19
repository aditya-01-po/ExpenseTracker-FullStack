import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe((data) => {

      console.log("API Response:", data);
      console.log("Array?", Array.isArray(data));
      console.log("Length:", data?.length);

      this.transactions = [...data]; // Use spread operator to create a new array
      console.log("Transactions Assigned:", this.transactions.length);
      this.cdr.detectChanges();
    });
  }

  getTotalIncome(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'Income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  editTransaction(transactionId: number) {
    const transaction = this.transactions.find(tx => tx.id === transactionId);
    if (transaction) {
      this.router.navigate(['/edit/', transactionId]);
    }
  }

  deleteTransaction(transactionId: number) {
    const transaction = this.transactions.find(tx => tx.id === transactionId);
    if (transaction) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        this.transactionService.delete(transactionId).subscribe(() => {
          // Remove the deleted transaction from the list
          this.loadTransactions(); // Reload transactions after deletion
        });
      }
    }
  }
}
