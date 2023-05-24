import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { LoginPageComponent } from "./components/pages/login-page/login-page.component";
import { SignupPageComponent } from "./components/pages/signup-page/signup-page.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { CurrencyPageComponent } from "./components/pages/currency-page/currency-page.component";
import { StatisticsPageComponent } from "./components/pages/statistics-page/statistics-page.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "signup",
    component: SignupPageComponent,
  },
  {
    path: "currency",
    component: CurrencyPageComponent,
  },
  {
    path: "statistics",
    component: StatisticsPageComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
