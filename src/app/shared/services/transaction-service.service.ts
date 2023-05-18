import { Injectable } from "@angular/core";
import {
  BankType,
  TransactionModel,
  TransactionType,
} from "../models/transaction.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionServiceService {
  transactionSubject = new Subject<TransactionModel[]>();

  constructor() {}
}
