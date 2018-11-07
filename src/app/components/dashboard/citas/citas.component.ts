import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: []
})
export class CitasComponent implements OnInit {

  citas:any[] = [];

  constructor(
    private citaService:CitaService
  ) { }

  public inicializar() {
    this.citaService.getCitas().subscribe(data => {
      this.citas = data;
    });
  }

  ngOnInit() {
    this.inicializar();
  }

  borrarCita(idCita:any) {
    this.citaService.eliminarCita(idCita)
    .subscribe(res => {
      if(res.estado) {
        this.inicializar();
      }
    });
  }
}