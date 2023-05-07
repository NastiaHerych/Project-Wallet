import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { LoginPageComponent } from "./components/pages/login-page/login-page.component";
import { SignupPageComponent } from "./components/pages/signup-page/signup-page.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "signup",
    component: SignupPageComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
