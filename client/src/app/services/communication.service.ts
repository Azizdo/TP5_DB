// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getRequest(endpoint: string) {
    return this.http.get(`${this.BASE_URL}/${endpoint}`);
}

  postRequest(endpoint: string, body: any) {
    return this.http.post(`${this.BASE_URL}/${endpoint}`, body);
  }

  putRequest(endpoint: string, body: any, id: number) {
    return this.http.put(`${this.BASE_URL}/${endpoint}/${id}`, body);
  }
  
  deleteRequest(endpoint: string, id: number) {
    return this.http.delete(`${this.BASE_URL}/${endpoint}/${id}`);
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  // private handleError<T>(
  //   request: string,
  //   result?: T
  // ): (error: Error) => Observable<T> {
  //   return (error: Error): Observable<T> => {
  //     return of(result as T);
  //   };
  // }
}
