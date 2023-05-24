import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { NgChartsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "./components/pages/login-page/login-page.component";
import { SignupPageComponent } from "./components/pages/signup-page/signup-page.component";
import { TransactionTableComponent } from "./components/tables/transaction-table/transaction-table.component";
import { AddIncomeModalComponent } from "./components/modal/add-income-modal/add-income-modal.component";
import { AddOutcomeModalComponent } from "./components/modal/add-outcome-modal/add-outcome-modal.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NavigationMenuComponent } from "./components/navigation-menu/navigation-menu.component";
import { DeleteModalComponent } from "./components/modal/delete-modal/delete-modal.component";
import { EditModalComponent } from "./components/modal/edit-modal/edit-modal.component";
import { BalanceMenuComponent } from "./components/balance-menu/balance-menu.component";
import { MonobankTokenModalComponent } from "./components/modal/monobank-token-modal/monobank-token-modal.component";
import { OtherBanksModalComponent } from "./components/modal/other-banks-modal/other-banks-modal.component";
import { CurrencyPageComponent } from "./components/pages/currency-page/currency-page.component";
import { CurrencyTableComponent } from "./components/tables/currency-table/currency-table.component";
import { StatisticsPageComponent } from "./components/pages/statistics-page/statistics-page.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    LoginPageComponent,
    SignupPageComponent,
    TransactionTableComponent,
    AddIncomeModalComponent,
    AddOutcomeModalComponent,
    NavigationMenuComponent,
    DeleteModalComponent,
    EditModalComponent,
    BalanceMenuComponent,
    MonobankTokenModalComponent,
    OtherBanksModalComponent,
    CurrencyPageComponent,
    CurrencyTableComponent,
    StatisticsPageComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
