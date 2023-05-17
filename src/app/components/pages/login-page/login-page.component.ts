import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  responseError: string = " ";

  constructor(private http: HttpClient, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  getUser(email: string) {
    const url = `http://localhost:3000/get/user?email=${email}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.success) {
          if (
            response.findResult &&
            response.findResult.password === this.password.value
          ) {
            this.responseError = "";
            localStorage.setItem("user", JSON.stringify(response.findResult));
            this.router.navigate(["/home"]);
          } else if (response.findResult === null) {
            this.responseError = "User not found";
          } else {
            this.responseError = "Password incorrect";
          }
        } else {
          this.responseError = "Login failed";
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  login() {
    this.getUser(this.loginForm.value.email);
  }
}
