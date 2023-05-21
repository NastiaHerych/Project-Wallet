import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BankType } from "src/app/shared/models/transaction.model";
import { MonobankAPIService } from "src/app/shared/services/monobank-api.service";

interface Bank {
  value: BankType;
  viewValue: string;
}

interface BankBalance {
  bankName: string;
  amount: string;
}

@Component({
  selector: "app-other-banks-modal",
  templateUrl: "./other-banks-modal.component.html",
  styleUrls: ["./other-banks-modal.component.scss"],
})
export class OtherBanksModalComponent {
  amount: string;

  bankOptions: Bank[] = [
    { value: BankType.PRIVAT, viewValue: "Privat Bank" },
    { value: BankType.RAIFFEISEN, viewValue: "Raiffeisen bank" },
    { value: BankType.UKRSIB, viewValue: "Ukrsib bank" },
    { value: BankType.ALPHA, viewValue: "Alpha bank" },
  ];

  bankBalances: BankBalance[] = [];
  userId: string;
  monobankBalance: number;
  token: string;

  constructor(
    public dialogRef: MatDialogRef<OtherBanksModalComponent>,
    private monobankService: MonobankAPIService,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit() {
    const storedToken = localStorage.getItem("monobankToken");
    if (storedToken) {
      this.token = storedToken;
    }
    this.monobankService.getAccountBalance(this.token).subscribe((response) => {
      this.monobankBalance = response.accounts[0].balance;
    });
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userId = parsedUser._id;
    }
  }

  addBalance() {
    this.bankBalances.push({ bankName: "", amount: "" });
  }

  removeBalance(index: number) {
    this.bankBalances.splice(index, 1);
  }

  finish() {
    this.bankBalances.push({
      bankName: "Monobank",
      amount: (this.monobankBalance / 100).toString(),
    });
    const url = "http://localhost:3000/post/balance";
    const data = {
      userId: this.userId,
      balances: this.bankBalances,
    };

    this.http.post(url, data).subscribe(
      (response) => {
        this.openSnackBar("Added successfully", "OK");
      },
      (error) => {
        console.error("Error:", error);
        this.openSnackBar("An error occurred while adding balances", "OK");
      }
    );
    this.dialogRef.close();
  }
}
