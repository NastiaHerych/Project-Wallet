import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.scss"],
})
export class SignupPageComponent {
  constructor(private http: HttpClient, private router: Router) {}

  passwordValidate = new RegExp(
    "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"
  );

  signUpForm = new FormGroup(
    {
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwordValidate),
      ]),
      confirmPassword: new FormControl("", Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  get email() {
    return this.signUpForm.get("email");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  get confirmPassword() {
    return this.signUpForm.get("confirmPassword");
  }

  get name() {
    return this.signUpForm.get("name");
  }

  signup() {
    const url = "http://localhost:3000/post/user";
    const data = this.signUpForm.value;

    this.http.post(url, data).subscribe(
      (response) => {
        console.log("Response:", response);
        this.router.navigate(["/login"]);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
