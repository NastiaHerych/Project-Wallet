import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  userName: string = "";

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.name;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
