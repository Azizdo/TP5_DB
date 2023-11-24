import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from './services/communication.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public route: string;
  doctors: any[]; 

  
  public constructor(location: Location, router: Router, private request: CommunicationService) {
    router.events.subscribe((_val: any) => {
      if (location.path() !== "") {
        this.route = location.path();
      } else {
        this.route = "";
      }
    });
  }
  fetchGames = () => {
    this.request.getRequest('').subscribe((res: any) => {
      this.doctors = res;
    });
  };
  
  public readonly title: string = "INF3710 TP4";
  public ngOnInit(): void {
    this.fetchGames();
  }
}
