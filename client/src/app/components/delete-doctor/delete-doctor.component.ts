import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-delete-doctor",
  templateUrl: "./delete-doctor.component.html",
  styleUrls: ["./delete-doctor.component.css"],
})
export class DeleteDoctorComponent implements OnInit {
  idInput: number | null = null;
  doctorIds: number[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctorsIds();
  }

  loadDoctorsIds() {
    this.doctorService.getDoctorIds().subscribe((ids) => {
      this.doctorIds = ids;
    });
  }

  deleteDoctor() {
    if (
      !this.idInput ||
      isNaN(Number(this.idInput)) ||
      Number(this.idInput) < 0
    ) {
      alert("Veuillez entrer un ID valide");
      return;
    }
    try {
      this.doctorService.deleteDoctor(this.idInput);
      alert("Médecin supprimé avec succès");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la suppression du médecin");
    }
  }
}
