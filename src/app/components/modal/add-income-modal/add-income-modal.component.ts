import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionType } from "src/app/shared/models/transaction.model";
import {
  BankType,
  TransactionModel,
} from "src/app/shared/models/transaction.model";
import { DatePipe } from "@angular/common";
import { TransactionServiceService } from "src/app/shared/services/transaction-service.service";

interface Bank {
  value: BankType;
  viewValue: string;
}

@Component({
  selector: "app-add-income-modal",
  templateUrl: "./add-income-modal.component.html",
  styleUrls: ["./add-income-modal.component.scss"],
  providers: [DatePipe],
})
export class AddIncomeModalComponent {
  selectedBank: BankType = BankType.MONO;

  transactionObj = {
    category: "",
    value: null,
    userId: "",
    bank: this.selectedBank,
    date: "",
    description: "",
    type: TransactionType.INCOME,
  };

  constructor(
    private transactionService: TransactionServiceService,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddIncomeModalComponent>,
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
    this.transactionObj.date = this.datePipe.transform(new Date(), "shortDate");
    console.log(this.transactionObj);
    this.transactionService.addTransaction(this.transactionObj)
    this.openSnackBar("added successfully", "ok");
    this.dialogRef.close();
  }
}
