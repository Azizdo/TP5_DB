import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-update-doctor",
  templateUrl: "./update-doctor.component.html",
  styleUrls: ["./update-doctor.component.css"],
})
export class UpdateDoctorComponent implements OnInit {
  idInput: number;
  idSlected: boolean = false;
  doctorIds: number[] = [];
  doctor: any = {};

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
    if (
      !this.idInput ||
      isNaN(Number(this.idInput)) ||
      Number(this.idInput) < 0
    ) {
      alert("Veuillez entrer un ID valide");
      return;
    }
    try {
      this.doctorService.getDoctor(this.idInput).subscribe((res: any) => {
        this.doctor = res;
      });
      this.idSlected = !this.idSlected;
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la récupération du médecin");
    }
  }

  cancelUpdate() {
    this.idSlected = !this.idSlected;
  }

  onSubmit() {
    if (
      this.doctor.anneesexperience === undefined ||
      typeof this.doctor.anneesexperience !== "number" ||
      !Number.isInteger(this.doctor.anneesexperience)
    ) {
      alert("L'expérience du médecin doit être un nombre entier.");
      return;
    }

    this.doctorService.updateDoctor(this.doctor, this.idInput).subscribe(
      (res) => {
        this.doctorService.getDoctors();
        this.idSlected = !this.idSlected;
        alert("Médecin mis à jour avec succès");
      },
      (error) => {
        console.log(error);
        alert("Erreur lors de la mise à jour du médecin");
      }
    );
  }
}
