import { Component } from "@angular/core";
import { MonobankAPIService } from "src/app/shared/services/monobank-api.service";

@Component({
  selector: "app-balance-menu",
  templateUrl: "./balance-menu.component.html",
  styleUrls: ["./balance-menu.component.scss"],
})
export class BalanceMenuComponent {
  balance: number;
  showBalance: boolean = false;
  formattedBalance: string;

  constructor(private monobankService: MonobankAPIService) {}

  formatNumber(number: number): string {
    const formatted = (number / 100).toFixed(2);
    return formatted;
  }

  toggleBalance() {
    const token = "";
    this.monobankService.getAccountBalance(token).subscribe((response) => {
      this.balance = response.accounts[0].balance;
      this.formattedBalance = this.formatNumber(this.balance);
    });
    this.showBalance = !this.showBalance;
  }
}
