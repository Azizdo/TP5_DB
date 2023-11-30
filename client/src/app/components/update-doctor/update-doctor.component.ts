import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-update-doctor",
  templateUrl: "./update-doctor.component.html",
  styleUrls: ["./update-doctor.component.css"],
})
export class UpdateDoctorComponent implements OnInit {
  idInput: number | null = null;
  idSlected: boolean = false;
  doctorIds: number[] = [];
  doctor: any = {
    idmedecin: 999,
    prenom: "Default",
    nom: "Doc",
    specialite: "Dermatologie",
    anneesexperience: 0,
    idservice: 0,
  };

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctorsIds();
  }

  loadDoctorsIds() {
    this.doctorService.getDoctorIds().subscribe((ids) => {
      this.doctorIds = ids;
    });
  }

  selectId() {
    this.idSlected = !this.idSlected;
  }

  updateDoctor() {
    alert("Médecin mis à jour avec succès");
  }

  onSubmit() {
    // if (
    //   !this.idInput ||
    //   isNaN(Number(this.idInput)) ||
    //   Number(this.idInput) < 0
    // ) {
    //   alert("Veuillez entrer un ID valide");
    //   return;
    // }
    // this.doctor.idmedecin = this.idInput;
    // this.updateDoctor();
  }
}
