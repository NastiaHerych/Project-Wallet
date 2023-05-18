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
import { HttpClient } from "@angular/common/http";
import { TransactionUpdateService } from "src/app/shared/services/transaction-update.service";

interface Bank {
  value: BankType;
  viewValue: string;
}

@Component({
  selector: "app-add-outcome-modal",
  templateUrl: "./add-outcome-modal.component.html",
  styleUrls: ["./add-outcome-modal.component.scss"],
  providers: [DatePipe],
})
export class AddOutcomeModalComponent {
  selectedBank: string | null = null;
  userID: string = "";

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
  }

  transactionObj = {
    userId: this.userID,
    value: null,
    category: "",
    type: TransactionType.OUTCOME,
    date: "",
    bank: null,
    description: "",
  };

  constructor(
    private transactionService: TransactionServiceService,
    private transactionUpdateService: TransactionUpdateService,
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
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

  onBankSelect() {
    this.transactionObj.bank = this.selectedBank;
  }

  cancel(): void {
    this.dialogRef.close();
    this.openSnackBar("canceled", "ok");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  addTransaction() {
    this.transactionObj.date = this.datePipe.transform(
      this.transactionObj.date,
      "shortDate"
    );
    this.transactionObj.userId = this.userID;

    const url = "http://localhost:3000/post/transaction";
    const data = this.transactionObj;

    this.http.post(url, data).subscribe(
      (response) => {
        this.openSnackBar("added successfully", "ok");
        this.transactionUpdateService.transactionAdded.emit(
          this.transactionObj
        );
      },
      (error) => {
        console.error("Error:", error);
        this.openSnackBar("error occured while adding transaction", "ok");
      }
    );
    this.dialogRef.close();
  }
}
