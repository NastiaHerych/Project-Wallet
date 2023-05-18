import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import {
  BankType,
  TransactionModel,
  TransactionType,
} from "src/app/shared/models/transaction.model";
import { TransactionUpdateService } from "src/app/shared/services/transaction-update.service";

interface Bank {
  value: BankType;
  viewValue: string;
}

@Component({
  selector: "app-edit-modal",
  templateUrl: "./edit-modal.component.html",
  styleUrls: ["./edit-modal.component.scss"],
  providers: [DatePipe],
})
export class EditModalComponent {
  selectedBank: string | null = null;
  userID: string = "";

  transactionObj = {
    _id: "",
    userId: "",
    value: null,
    category: "",
    type: TransactionType.INCOME,
    date: "",
    bank: null,
    description: "",
  };

  constructor(
    private transactionUpdateService: TransactionUpdateService,
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionModel
  ) {}

  bankOptions: Bank[] = [
    { value: BankType.MONO, viewValue: "Monobank" },
    { value: BankType.PRIVAT, viewValue: "Privat Bank" },
    { value: BankType.RAIFFEISEN, viewValue: "Raiffeisen bank" },
    { value: BankType.UKRSIB, viewValue: "Ukrsib bank" },
    { value: BankType.ALPHA, viewValue: "Alpha bank" },
  ];

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
    this.transactionObj = { ...this.data };
    this.selectedBank = this.transactionObj.bank;
  }

  onBankSelect() {
    switch (this.selectedBank) {
      case "Monobank":
        this.transactionObj.bank = BankType.MONO;
        break;
      case "Privat Bank":
        this.transactionObj.bank = BankType.PRIVAT;
        break;
      case "Raiffeisen bank":
        this.transactionObj.bank = BankType.RAIFFEISEN;
        break;
      case "Ukrsib bank":
        this.transactionObj.bank = BankType.UKRSIB;
        break;
      case "Alpha bank":
        this.transactionObj.bank = BankType.ALPHA;
        break;
      default:
        this.transactionObj.bank = null;
        break;
    }
  }

  cancel(): void {
    this.dialogRef.close();
    this.openSnackBar("Canceled", "OK");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  updateTransaction() {
    this.transactionObj.date = this.datePipe.transform(
      this.transactionObj.date,
      "shortDate"
    );
    this.transactionObj.userId = this.userID;

    const url = `http://localhost:3000/update/transaction/${this.transactionObj._id}`;
    const data = {
      userId: this.transactionObj.userId,
      value: this.transactionObj.value,
      category: this.transactionObj.category,
      type: this.transactionObj.type,
      date: this.transactionObj.date,
      bank: this.transactionObj.bank,
      description: this.transactionObj.description,
    };

    this.http.put(url, data).subscribe(
      (response) => {
        this.openSnackBar("Updated successfully", "OK");
        this.transactionUpdateService.transactionUpdated.emit(
          this.transactionObj
        );
      },
      (error) => {
        console.error("Error:", error);
        this.openSnackBar("Error occurred while updating transaction", "OK");
      }
    );

    this.dialogRef.close();
  }
}
