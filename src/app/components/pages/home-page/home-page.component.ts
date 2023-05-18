import { Component } from "@angular/core";
import { AddIncomeModalComponent } from "../../modal/add-income-modal/add-income-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { ViewChild } from "@angular/core";
import { AddOutcomeModalComponent } from "../../modal/add-outcome-modal/add-outcome-modal.component";
import { TransactionTableComponent } from "../../tables/transaction-table/transaction-table.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  @ViewChild(TransactionTableComponent)
  transactionTable: TransactionTableComponent;
  constructor(public dialog: MatDialog) {}

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
