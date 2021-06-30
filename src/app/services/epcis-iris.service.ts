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
    this.messageService.add(`EPCIS Service: ${message}`);
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


  httpTextOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'responseType': 'text'})
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
  linkDischarge():Observable<any> {
    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep2'
    return this.http.get<any>(url)
    .pipe(
      tap((newLink: any) => this.log('Link Discharge Document: '+`${newLink}`)),
      catchError(this.handleError<any>('linkDischarge')))
  }

  linkPigeonHole():Observable<any> {
    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep5'
    return this.http.get<any>(url)
    .pipe(
      tap((newLink: any) => this.log('Link Pigeon Hole : '+`${newLink}`)),
      catchError(this.handleError<any>('linkPigeonhole')))
  }
  
  getInpatientSpellId(genLabelForm: any):Observable<any> {
    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep3'
    return this.http.get<any>(url, genLabelForm)
    .pipe(
      tap((any: any) => this.log('Inpatient Spell Id: '+`${any.EventQueryResult[0].EPCISBody.EventList.TransactionEvent[0].any[1]}`)),
      catchError(this.handleError<any>('getInpatientSpellId')))

  }

  getPatientLocationId(genLabelForm: any):Observable<any> {
    const headers = new HttpHeaders()
    let url = 'http://localhost:52773/query/demoStep4'
    return this.http.get<any>(url, genLabelForm)
    .pipe(
      tap((any: any) => this.log('Patient Location Id: '+`${any.EventQueryResult[0].EPCISBody.EventList.ObjectEvent[0].bizLocation.id}`)),
      catchError(this.handleError<any>('getPatientLocationId')))

  }

}