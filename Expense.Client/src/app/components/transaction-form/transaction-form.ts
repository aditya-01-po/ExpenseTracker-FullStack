import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm implements OnInit {
  transactionForm: FormGroup;
  errorMessage: string | null = null;

  incomeCategories = ['Salary', 'Business', 'Investment', 'Gift', 'Other'];
  expenseCategories = ['Food', 'Transport', 'Entertainment', 'Health', 'Other'];
  availableCategories: string[] = [];

  editMode = false;
  transactionId?: number;

  constructor(private fb: FormBuilder, private router: Router, private transactionService: TransactionService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      category: [''],
      amount: ['', [Validators.required, Validators.min(0)]],
      createdAt: [new Date(), Validators.required]
    });
  }

  //OnInit is an Angular lifecycle interface, and ngOnInit() is the lifecycle method that Angular automatically calls once after the component has been initialized. Constructors are mainly used for dependency injection, while ngOnInit() is used for initialization logic such as loading data, reading route parameters, and setting up component state.
  //Constructor = Get Dependencies
  //ngOnInit = Start Your Component
  ngOnInit(): void {
    const Type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(Type);
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }

loadTransaction(id: number): void {

  this.transactionService.getById(id).subscribe({

    next: (transaction) => {

      this.updateAvailableCategories(transaction.type);

      this.transactionForm.patchValue({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        createdAt: new Date(transaction.createdAt)
      });

    },

    error: (error) => {
      //console.error('Error loading transaction:', error);
      this.errorMessage =
          error.error?.message || error.error ||
          'Transaction not found';
      //console.log('Error message:', this.errorMessage);
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/transactions']);
      }, 3000);
    }

  });

}

  onTypeChange(): void {
    const Type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(Type);
  }

  updateAvailableCategories(type?: string): void {
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({ category: '' });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;

      if(this.editMode && this.transactionId) {
        this.transactionService.update(this.transactionId, transactionData).subscribe(
          (response) => {
            console.log('Transaction updated successfully:', response);
            this.router.navigate(['/transactions']);
          },
          (error) => {
            console.error('Error updating transaction:', error);
          }
        );
      }

      else{
        this.transactionService.create(transactionData).subscribe(
        (response) => {
          console.log('Transaction created successfully:', response);
          this.router.navigate(['/transactions']);
        },
        (error) => {
          console.error('Error creating transaction:', error);
        }
      );
      }
    }
    else {
      console.log('Form is invalid');
    }
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }
}
