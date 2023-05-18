import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransactionServiceService } from "src/app/shared/services/transaction-service.service";
import { TransactionUpdateService } from "src/app/shared/services/transaction-update.service";

@Component({
  selector: "app-transaction-table",
  templateUrl: "./transaction-table.component.html",
  styleUrls: ["./transaction-table.component.scss"],
})
export class TransactionTableComponent implements OnInit {
  transactionList: any[] = [];

  constructor(
    private transactionService: TransactionServiceService,
    private transactionUpdateService: TransactionUpdateService,
    private http: HttpClient
  ) {}

  userID: string = "";

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
    this.getTransactions(this.userID);
    this.transactionUpdateService.transactionAdded.subscribe((transaction) => {
      this.addTransactionToList(transaction);
    });
  }

  addTransactionToList(transaction: any) {
    this.transactionList.push(transaction);
  }

  getTransactions(userID: string) {
    const url = `http://localhost:3000/get/transactions?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.transactionList = response.findResult;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  deleteTransaction(transactionId: string) {
    console.log(transactionId);
    const url = `http://localhost:3000/delete/transactions/${transactionId}`;
    this.http.delete(url).subscribe(
      (response: any) => {
        console.log("Transaction deleted successfully");
        this.getTransactions(this.userID);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
