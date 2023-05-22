import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-currency-table",
  templateUrl: "./currency-table.component.html",
  styleUrls: ["./currency-table.component.scss"],
})
export class CurrencyTableComponent {
  balance: number = 0;
  balanceList: any;
  userID: string = "";
  private apiUrl = "http://localhost:3000/get/currencies";
  currencyList: any;
  usdExchangeRate: number;
  euroExchangeRate: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }

    this.getBalances(this.userID);
    this.getCurrencyFromAPI();
  }

  getCurrencyFromAPI() {
    this.http.get(this.apiUrl).subscribe(
      (response: any) => {
        this.currencyList = response.data.exchangeRate;
        console.log(this.currencyList);
        this.usdExchangeRate = this.findExchangeRate("USD");
        this.euroExchangeRate = this.findExchangeRate("EUR");
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  shouldDisplayCurrency(currency: string): boolean {
    const currenciesToDisplay = [
      "AUD",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "EUR",
      "PLN",
      "USD",
      "TRY",
      "NOK",
    ];
    return currenciesToDisplay.includes(currency);
  }

  calculateAmount(amount: string, exchangeRate: number): number {
    const parsedAmount = parseFloat(amount);
    return parsedAmount / exchangeRate;
  }

  findExchangeRate(currency: string): number {
    const foundCurrency = this.currencyList.find(
      (c: any) => c.currency === currency
    );
    return foundCurrency ? foundCurrency.purchaseRateNB : 0;
  }

  getBalances(userID: string) {
    const url = `http://localhost:3000/get/balances?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.findResult.length) {
          this.balanceList = response.findResult;
          console.log(this.balanceList);
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
}
