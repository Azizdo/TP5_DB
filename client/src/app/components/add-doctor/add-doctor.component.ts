import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "src/app/services/communication.service";

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.css"],
})
export class AddDoctorComponent implements OnInit {
  doctor: any = {};

  constructor(private request: CommunicationService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    try {
      console.log(this.doctor);
      this.request.postRequest("/", this.doctor).subscribe((res: any) => {
        if (res) {
          alert(`doctor ${res.prenom} ${res.nom} added successfully`);
          this.router.navigateByUrl("/");
        } else {
          alert("problem adding a doctor, make sure all fields are filled");
        }
      });
    } catch (error) {
      console.log(error)
      alert("problem adding a doctor, make sure all fields are filled");
    }
  }
}
