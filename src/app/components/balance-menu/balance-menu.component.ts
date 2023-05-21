import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MonobankAPIService } from "src/app/shared/services/monobank-api.service";
import { TransactionUpdateService } from "src/app/shared/services/transaction-update.service";

@Component({
  selector: "app-balance-menu",
  templateUrl: "./balance-menu.component.html",
  styleUrls: ["./balance-menu.component.scss"],
})
export class BalanceMenuComponent {
  balance: number = 0;
  balanceList: any;
  userID: string = "";
  showBalances = false;
  buttonClicked: boolean = false;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private transactionUpdateService: TransactionUpdateService
  ) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
  }

  getBalances(userID: string) {
    const url = `http://localhost:3000/get/balances?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.findResult.length) {
          this.balanceList = response.findResult;
          this.calculateFormattedBalance();
        } else {
          this.balanceList = [
            {
              _id: "",
              userId: this.userID,
              balances: [
                {
                  bankName: "",
                  amount: "",
                },
              ],
            },
          ];
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  showBankBalances(): void {
    this.showBalances = true;
    this.buttonClicked = true;
    this.getBalances(this.userID);
  }

  hideBankBalance(): void {
    this.showBalances = false;
    this.buttonClicked = false;
  }

  calculateFormattedBalance(): void {
    let sum = 0;
    for (const balance of this.balanceList[0].balances) {
      sum += parseInt(balance.amount);
    }
    this.balance = sum;
  }
}
