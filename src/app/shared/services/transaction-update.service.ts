import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransactionUpdateService {
  transactionAdded: EventEmitter<any> = new EventEmitter<any>();

  transactionUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
