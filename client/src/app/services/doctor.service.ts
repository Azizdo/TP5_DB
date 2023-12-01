import { Injectable } from "@angular/core";
import { CommunicationService } from "./communication.service";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";

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

  updateDoctor(doctor: any, id: number): Observable<any> {
    const idExists = this.doctorsSubject.value.some(
      (doctor) => doctor.idmedecin === id
    );

    if (!idExists) {
      return throwError("Veuillez entrer un ID valide");
    }

    return this.request.putRequest("", doctor, id).pipe(
      catchError((error) => {
        console.error(error);
        return throwError("Erreur lors de la mise à jour du médecin");
      })
    );
  }

  deleteDoctor(id: number): Observable<any> {
    const idExists = this.doctorsSubject.value.some(
      (doctor) => doctor.idmedecin === id
    );
    if (!idExists) {
      return throwError("Veuillez entrer un ID valide");
    }
    return this.request.deleteRequest("", id).pipe(
      catchError((error) => {
        console.error(error);
        return throwError("Erreur lors de la suppression du médecin");
      })
    );
  }
}
