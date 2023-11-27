import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";

@Component({
  selector: "app-list-doctors",
  templateUrl: "./list-doctors.component.html",
  styleUrls: ["./list-doctors.component.css"],
})
export class ListDoctorsComponent implements OnInit {
  doctors: any[]; 
  
  constructor(private request: CommunicationService) {}
  fetchGames = () => {
    this.request.getRequest("").subscribe((res: any) => {
      this.doctors = res;
    });
  };

  public readonly title: string = "INF3710 TP4";
  public ngOnInit(): void {
    this.fetchGames();
  }
}
