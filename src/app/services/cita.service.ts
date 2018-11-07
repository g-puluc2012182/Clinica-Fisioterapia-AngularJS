import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CitaService {
  constructor(
    private http:Http
  ) {  }

  public getCitas() {
    let uri = "http://localhost:3000/api/v1/cita/";
    let headers = new Headers({
      'Authorization': localStorage.getItem('token')
    });

    let options = new RequestOptions({ headers: headers});
    return this.http.get(uri, options)
    .map(res => res.json());
  }

  public getCita(idCita:number) {
    let uri = "http://localhost:3000/api/v1/cita/" + idCita;
    let headers = new Headers({
      'Authorization': localStorage.getItem('token')
    });

    let options = new RequestOptions({ headers: headers});
    return this.http.get(uri, options)
    .map(res => {
      console.log(res.json());
      return res.json();
    });
  }

  public nuevoCita(cita:any) {
    let uri = "http://localhost:3000/api/v1/cita/";
    let data = JSON.stringify(cita);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.post(uri, data, { headers })
    .map(res => {
      return res.json();
    });
  }

  public editarCita(cita:any, idCita:any) {
    let uri = "http://localhost:3000/api/v1/cita/" + idCita;
    let data = JSON.stringify(cita);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.put(uri, data, { headers })
    .map(res => {
      return res.json();
    });
  }

  public eliminarCita(idCita:any) {
    let uri = "http://localhost:3000/api/v1/cita/" + idCita;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    let options = new RequestOptions({headers: headers});
    return this.http.delete(uri, options)
    .map(res => {
      return res.json();
    });
  }
}