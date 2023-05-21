import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransactionServiceService } from "src/app/shared/services/transaction-service.service";
import { TransactionUpdateService } from "src/app/shared/services/transaction-update.service";
import { DeleteModalComponent } from "../../modal/delete-modal/delete-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EditModalComponent } from "../../modal/edit-modal/edit-modal.component";

@Component({
  selector: "app-transaction-table",
  templateUrl: "./transaction-table.component.html",
  styleUrls: ["./transaction-table.component.scss"],
})
export class TransactionTableComponent implements OnInit {
  transactionList: any[] = [];
  userID: string = "";

  constructor(
    private transactionService: TransactionServiceService,
    private transactionUpdateService: TransactionUpdateService,
    private http: HttpClient,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

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
    this.transactionUpdateService.transactionUpdated.subscribe(
      (updatedTransaction) => {
        const index = this.transactionList.findIndex(
          (transaction) => transaction._id === updatedTransaction._id
        );
        if (index !== -1) {
          this.transactionList[index] = updatedTransaction;
        }
      }
    );
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  updateTransaction(transaction: any) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: "370px",
      data: transaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  deleteTransaction(transactionId: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        message: "Do you want to delete?",
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
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
      } else {
        this.openSnackBar("canceled deleting", "ok");
      }
    });
  }
}
