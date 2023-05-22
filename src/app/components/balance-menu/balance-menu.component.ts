import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
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
  balanceId: string = "";

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
    this.transactionUpdateService.transactionAdded.subscribe(
      (transaction: any) => {
        const bankName = transaction.bank;
        const amount = Number(transaction.value);

        let bankToUpdate = this.balanceList[0]?.balances.find(
          (balance) => balance.bankName === bankName
        );
        if (!bankToUpdate) {
          bankToUpdate = { bankName, amount: 0 };
          this.balanceList[0]?.balances.push(bankToUpdate);
        }

        if (transaction.type === "INCOME") {
          bankToUpdate.amount = Number(bankToUpdate.amount) + amount;
        } else {
          bankToUpdate.amount = Number(bankToUpdate.amount) - amount;
        }
        this.balanceId = this.balanceList.userId;
        this.calculateFormattedBalance();
        const balanceId = this.balanceList[0]?._id;
        const updatedBalances = this.balanceList[0].balances;
        const updateRequest = {
          _id: balanceId,
          balances: updatedBalances,
        };

        this.http
          .put(
            `http://localhost:3000/update/balance/${balanceId}`,
            updateRequest
          )
          .subscribe(
            (response: any) => {
              if (response.success) {
                console.log("Balance updated successfully");
                const updated = this.updateBalanceById(
                  balanceId,
                  updatedBalances
                );
                if (!updated) {
                  console.log("Failed to update balanceList with new balances");
                }
              } else {
                console.log("Balance not found");
              }
            },
            (error) => {
              console.error("An error occurred while updating balance:", error);
            }
          );
      }
    );
  }

  updateBalanceById(balanceId, newBalances) {
    const balanceListIndex = this.balanceList.findIndex(
      (item) => item._id === balanceId
    );

    if (balanceListIndex !== -1) {
      this.balanceList[balanceListIndex].balances = newBalances;
      return true;
    }

    return false;
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
    for (const balance of this.balanceList[0]?.balances || []) {
      sum += Number(balance.amount);
    }
    this.balance = sum;
  }
}
