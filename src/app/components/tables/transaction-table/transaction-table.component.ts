import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TransactionModel } from "src/app/shared/models/transaction.model";
import { TransactionServiceService } from "src/app/shared/services/transaction-service.service";

@Component({
  selector: "app-transaction-table",
  templateUrl: "./transaction-table.component.html",
  styleUrls: ["./transaction-table.component.scss"],
})
export class TransactionTableComponent implements OnInit, OnDestroy {
  transactionList: TransactionModel[] = [];
  transactoionSubscription = new Subscription();

  constructor(private transactionService: TransactionServiceService) {}

  ngOnInit() {
    this.transactoionSubscription =
      this.transactionService.transactionSubject.subscribe(
        (item) => (this.transactionList = item)
      );
    this.transactionList = this.transactionService.transactionList;
  }

  ngOnDestroy(): void {
    this.transactoionSubscription.unsubscribe();
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id);
  }
}
