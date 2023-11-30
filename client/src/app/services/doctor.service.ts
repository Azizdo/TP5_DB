import { Injectable } from "@angular/core";
import { CommunicationService } from "./communication.service";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  private doctorsSubject = new BehaviorSubject<any[]>([]);
  doctorsList = this.doctorsSubject.asObservable();

  constructor(private request: CommunicationService) {}

  getDoctors = () => {
    this.request.getRequest("").subscribe((res: any) => {
      this.doctorsSubject.next(res);
    });
  };

  getDoctorIds(): Observable<number[]> {
    return this.doctorsList.pipe(
      map((doctors) => doctors.map((doctor) => doctor.idmedecin))
    );
  }
  
  deleteDoctor(id: number) {
    const idExists = this.doctorsSubject.value.some(
      (doctor) => doctor.idmedecin === id
    );
    if (!idExists) {
      alert("Veuillez entrer un ID valide");
      return;
    }
    try {
      this.request.deleteRequest("", id).subscribe((res: any) => {
        this.getDoctors();
      });
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la suppression du médecin");
    }
  }
}
