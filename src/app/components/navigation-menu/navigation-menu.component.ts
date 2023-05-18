import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-navigation-menu",
  templateUrl: "./navigation-menu.component.html",
  styleUrls: ["./navigation-menu.component.scss"],
})
export class NavigationMenuComponent {
  activeRoute: string = "/";

  constructor(private router: Router) {
    this.activeRoute = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }
}
