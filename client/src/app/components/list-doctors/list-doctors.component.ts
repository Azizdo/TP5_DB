import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-list-doctors",
  templateUrl: "./list-doctors.component.html",
  styleUrls: ["./list-doctors.component.css"],
})
export class ListDoctorsComponent implements OnInit {
  doctors: any[]; 
  
  constructor(private doctorService: DoctorService) {}

  public readonly title: string = "INF3710 TP4";
  public ngOnInit(): void {
    this.fetchDoctors();
  }

  private fetchDoctors(): void {
    this.doctorService.getDoctors();
    this.doctorService.doctorsList.subscribe((res: any) => {
      this.doctors = res;
    });
  }
}
