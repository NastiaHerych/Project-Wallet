import { Component } from "@angular/core";
import { AddIncomeModalComponent } from "../../modal/add-income-modal/add-income-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { ViewChild } from "@angular/core";
import { AddOutcomeModalComponent } from "../../modal/add-outcome-modal/add-outcome-modal.component";
import { TransactionTableComponent } from "../../tables/transaction-table/transaction-table.component";
import { HttpClient } from "@angular/common/http";
import { MonobankTokenModalComponent } from "../../modal/monobank-token-modal/monobank-token-modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  @ViewChild(TransactionTableComponent)
  transactionTable: TransactionTableComponent;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {}
  balance: number = 0;
  balanceList: any;
  userID: string = "";
  showBalances = false;
  buttonClicked: boolean = false;

  getBalances(userID: string) {
    const url = `http://localhost:3000/get/balances?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (!response.findResult.length) {
          const dialogRef = this.dialog.open(MonobankTokenModalComponent, {
            width: "370px",
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
          });
        } 
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
    this.getBalances(this.userID);
  }

  openIncomeModal() {
    const dialogRef = this.dialog.open(AddIncomeModalComponent, {
      width: "370px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openOutcomeModal() {
    const dialogRef = this.dialog.open(AddOutcomeModalComponent, {
      width: "370px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
