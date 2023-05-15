import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankType, TransactionModel } from 'src/app/shared/models/transaction.model';
import { TransactionServiceService } from 'src/app/shared/services/transaction-service.service';

interface Bank {
  value: BankType;
  viewValue: string;
}

@Component({
  selector: "app-add-outcome-modal",
  templateUrl: "./add-outcome-modal.component.html",
  styleUrls: ["./add-outcome-modal.component.scss"],
})
export class AddOutcomeModalComponent {
  transactionObj = {
    category: "",
    value: "",
    userId: "",
    bankName: "",
    date: "",
    description: "",
  };

  constructor(
    private transactionService: TransactionServiceService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddOutcomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionModel
  ) {}

  bankOptions: Bank[] = [
    { value: BankType.MONO, viewValue: "Monobank" },
    { value: BankType.PRIVAT, viewValue: "Privat Bank" },
    { value: BankType.RAIFFEISEN, viewValue: "Raiffeisen bank" },
    { value: BankType.UKRSIB, viewValue: "Ukrsib bank" },
    { value: BankType.ALPHA, viewValue: "Alpha bank" },
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  addTransaction() {
    
    this.openSnackBar("added successfully", "ok");
    this.dialogRef.close();
  }
}
