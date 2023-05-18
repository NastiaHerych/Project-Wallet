export class TransactionModel {
  userId: string;
  category: string;
  type: TransactionType;
  value: number;
  date: string;
  bank: BankType;
  description: string;
  _id: string;

  constructor(
    userId: string,
    category: string,
    type: TransactionType,
    value: number,
    date: string,
    bank: BankType,
    description: string,
    _id: string
  ) {
    this.userId = userId;
    this.category = category;
    this.type = type;
    this.value = value;
    this.date = date;
    this.bank = bank;
    this.description = description;
    this._id = _id;
  }
}

export enum TransactionType {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
}

export enum BankType {
  MONO = "Monobank",
  PRIVAT = "Privat Bank",
  RAIFFEISEN = "Raiffeisen bank",
  UKRSIB = "Ukrsib bank",
  ALPHA = "Alpha bank",
}
