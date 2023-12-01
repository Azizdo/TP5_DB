import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "src/app/services/communication.service";

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.css"],
})
export class AddDoctorComponent implements OnInit {
  doctor: any = {
    prenom: "Default",
    nom: "Doc",
    specialite: "Dermatologie",
    anneesexperience: 0,
    idservice: 0,
  };

  constructor(private request: CommunicationService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.doctor.prenom.trim() === "" ||
      this.doctor.nom.trim() === "" ||
      this.doctor.specialite === "" ||
      this.doctor.anneesexperience == null ||
      this.doctor.idservice == null
    ) {
      alert("Problem adding a doctor: some fields are unfilled");
      return;
    } else if (this.doctor.anneesexperience < 0) {
      alert(
        "Problem adding a doctor: the years of experience most be positive"
      );
      return;
    }
    try {
      console.log(this.doctor);
      this.request.postRequest("/", this.doctor).subscribe((res: any) => {
        if (res) {
          alert(`doctor added successfully`);
          this.router.navigateByUrl("/list");
        } else {
          alert("problem adding a doctor");
        }
      });
    } catch (error) {
      console.log(error);
      alert("problem adding a doctor");
    }
  }
}
