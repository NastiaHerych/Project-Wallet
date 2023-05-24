import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent {
  balanceList: any;
  transactionList: any[] = [];
  userID: string = "";
  balance: number = 0;
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userID = parsedUser._id;
    }
    this.getBalances(this.userID);
    this.getTransactions(this.userID);
  }

  getTransactions(userID: string) {
    const url = `http://localhost:3000/get/transactions?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.transactionList = response.findResult;
        console.log(this.transactionList);
        this.createLineChartDate();
        this.createBarChart();
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  getBalances(userID: string) {
    const url = `http://localhost:3000/get/balances?userId=${userID}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.findResult.length) {
          this.balanceList = response.findResult;
          console.log(this.balanceList);
          this.calculateFormattedBalance();
          this.createBalanceChart();
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

  createBalanceChart() {
    const balances = this.balanceList[0].balances;
    const labels = balances.map((balance) => balance.bankName);
    const data = balances.map((balance) => balance.amount);

    this.chart = new Chart("Chart1", {
      type: "pie",

      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#F6B3D2",
              "#765BBB",
              "#d2c3f8",
              "#e43f8c",
              "#5b3cab",
              "#EFF3F9",
            ],
          },
        ],
      },
      options: {
        aspectRatio: 4,
      },
    });
  }

  createLineChartDate() {
    const dates = this.transactionList.map((transaction) => transaction.date);
    const outcomes = this.transactionList
      .filter((transaction) => transaction.type === "OUTCOME")
      .map((transaction) => parseFloat(transaction.value));
    const incomes = this.transactionList
      .filter((transaction) => transaction.type === "INCOME")
      .map((transaction) => parseFloat(transaction.value));

    this.chart = new Chart("Chart2", {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Outcomes",
            data: outcomes,
            borderColor: "#5b3cab",
            backgroundColor: "transparent",
          },
          {
            label: "Incomes",
            data: incomes,
            borderColor: "#e43f8c",
            backgroundColor: "transparent",
          },
        ],
      },
      options: {
        aspectRatio: 3,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Amount of Transactions",
            },
          },
        },
      },
    });
  }

  createBarChart() {
    const categoryData = {};
    this.transactionList.forEach((transaction) => {
      const { category, value } = transaction;
      if (categoryData.hasOwnProperty(category)) {
        categoryData[category] += parseFloat(value);
      } else {
        categoryData[category] = parseFloat(value);
      }
    });

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);

    this.chart = new Chart("Chart3", {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Amount of Transactions",
            data: amounts,
            backgroundColor: "#F6B3D2",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Category",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Amount of Transactions",
            },
          },
        },
      },
    });
  }

  calculateFormattedBalance(): void {
    let sum = 0;
    for (const balance of this.balanceList[0]?.balances || []) {
      sum += Number(balance.amount);
    }
    this.balance = sum;
  }
}
