import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaService } from '../../../services/cita.service';
import { ContactoService } from '../../../services/contacto.service';

@Component({
  selector: 'app-citas-form',
  templateUrl: 'citas-form.component.html',
})
export class CitasFormComponent implements OnInit {
  formularioCita:FormGroup;
  uri:string;
  cita:any;
  contact:any[] = [];
  notificacion:any = {
    estado: false,
    mensaje: ""
  }

  constructor(
    private citaService:CitaService,
    private contactoService:ContactoService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    let validaciones = [
      Validators.required, Validators.minLength(3)
    ];

    this.activatedRoute.params.subscribe(params => {
      this.uri = params["idCita"];
      if(this.uri !== "nuevo") {
        this.citaService.getCita(params["idCita"])
        .subscribe(cita => {
          this.cita = cita;
          this.formularioCita = new FormGroup({
            'fecha': new FormControl(this.cita.fecha, validaciones),
            'lugar': new FormControl(this.cita.lugar, validaciones),
            'asunto': new FormControl(this.cita.asunto, validaciones),
            'idContacto': new FormControl(this.cita.idContacto,  Validators.required),
          });
        });
      } else {
        this.formularioCita = new FormGroup({
          'fecha': new FormControl('', validaciones),
          'lugar': new FormControl('', validaciones),
          'asunto': new FormControl('', validaciones),
          'idContacto': new FormControl('', Validators.required)
        });
      }
    });
  }

  ngOnInit() {
    this.contactoService.getContactos().subscribe(data =>{
      this.contact = data;
    })
  }

  public guardarCambios() {
    if(this.uri === "nuevo") {
      console.log("Nueva Cita");
      console.log(this.formularioCita.value);
      this.citaService.nuevoCita(this.formularioCita.value)
      .subscribe(res => {
        if(res.estado) {
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.router.navigate(['/dashboard/citas']);
          }, 5000);
        }
      });
    } else {
      console.log("Modificacion de cita");
      this.citaService.editarCita(this.formularioCita.value, this.uri)
      .subscribe(res => {
         if(res.estado) {
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.router.navigate(['/dashboard/citas']);
          }, 3000);
        }
      });
    }
  }
}