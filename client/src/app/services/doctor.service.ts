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

  getDoctors() {
    this.request.getRequest("").subscribe((res: any) => {
      this.doctorsSubject.next(res);
    });
  }

  getDoctor(id: number): Observable<any> {
    return this.request.getRequest(`/${id}`);
  }

  getDoctorIds(): Observable<number[]> {
    return this.doctorsList.pipe(
      map((doctors) => doctors.map((doctor) => doctor.idmedecin))
    );
  }

  updateDoctor(doctor: any, id: number) {
    const idExists = this.doctorsSubject.value.some(
      (doctor) => doctor.idmedecin === id
    );
    if (!idExists) {
      throw Error("Veuillez entrer un ID valide");
      return;
    }
    try {
      this.request.putRequest("", doctor, id).subscribe((res: any) => {
        this.getDoctors();
      });
    } catch (error) {
      console.log(error);
      throw Error("Erreur lors de la mise à jour du médecin");
    }
  }

  deleteDoctor(id: number) {
    const idExists = this.doctorsSubject.value.some(
      (doctor) => doctor.idmedecin === id
    );
    if (!idExists) {
      throw Error("Veuillez entrer un ID valide");
      return;
    }
    try {
      this.request.deleteRequest("", id).subscribe((res: any) => {
        this.getDoctors();
      });
    } catch (error) {
      console.log(error);
      throw Error("Erreur lors de la suppression du médecin");
    }
  }
}
