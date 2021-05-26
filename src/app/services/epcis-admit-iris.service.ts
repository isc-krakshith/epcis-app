import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class EPCISIRISService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    console.warn("called...")
    this.messageService.add(`EPCIS ADT Service: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // It appears unnecessary to create http options / headers
  // for ths application, but included for completeness of solution
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'responseType': 'json'})
  };

  admitPatient(admitForm: any):Observable<any> {

    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep1'
    return this.http.post<any>(url, admitForm,this.httpOptions)
    .pipe(
      tap((newAdmit: any) => this.log(`${newAdmit.PAS}`)),
      catchError(this.handleError<any>('admitPatient')))
  }
  dischargePatient(admitForm: any):Observable<any> {

    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep8'
    return this.http.post<any>(url, admitForm,this.httpOptions)
    .pipe(
      tap((newDischarge: any) => this.log(`${newDischarge.PAS}`)),
      catchError(this.handleError<any>('dischargePatient')))
  }
}