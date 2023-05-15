import { Injectable } from '@angular/core';
import { BankType, TransactionModel, TransactionType } from '../models/transaction.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class TransactionServiceService {

  transactionSubject = new Subject<TransactionModel[]>();

  transactionList: TransactionModel[] = [
    {
      type: TransactionType.INCOME,
      value: 100.0,
      category: "fruits",
      bank: BankType.MONO,
      userId: "123",
      description : "clothes",
      id: "0012",
      date: "12/10",
    },
    {
      type: TransactionType.INCOME,
      value: 90,
      category: "fruits",
      bank: BankType.MONO,
      description: "sweet",
      userId: "123",
      id: "0012",
      date: "12/10",
    },
  ];

  constructor() {}

  deleteTransaction(id : number){
    this.transactionList.splice(id, 1)
    this.transactionSubject.next(this.transactionList)
  }

  addTransaction(transaction : TransactionModel){
    this.transactionList.push(transaction);
  }
}
