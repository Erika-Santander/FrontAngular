import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {PersonaService} from '../../../_services/persona.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [PersonaService]
})
export class PersonaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private  personaService: PersonaService,
              private modalService: NgbModal,
  ) {

  }

  source = {
    count: 10,
    rows: []
  };
  idPersona;
  formularioPersona: FormGroup;

  ngOnInit(): void {
    this.obtenerDatos();
    this.resetFormulario();
  }

  resetFormulario() {
    this.formularioPersona = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      direccion: [''],
      age: [''],
    });
  }

  async obtenerDatos() {
    this.personaService.obtener().then((result: any[]) => {
      this.source.rows = result;
    }).catch(err => {
      console.log(err, 'error');
    });
  }

  get form() {
    return this.formularioPersona.controls;
  }

  /*funcion crear*/
  creando(formulario) {
    if (formulario.status === 'VALID') {
      const model = {
        name: formulario.value.name,
        lastname: formulario.value.lastname,
        direccion: formulario.value.direccion,
        age: formulario.value.age,
      };
      /*crear user*/
      this.personaService.agrega(model) // llamar funcion desde servicio
        .then(result => {
          this.obtenerDatos();/*actualiza la tabla*/
          this.modalService.dismissAll();/*cerrar el modal*/
          this.resetFormulario();
          Swal.fire(
            'Guardado!',
            'Se creo correcto',
            'success'
          );
        }).catch(err => {
        Swal.fire(
          'error!',
          'errooorrrr',
          'error'
        );
      });
    } else {
      Swal.fire(
        'error!',
        'verificar campos',
        'error'
      );
    }

  }

  actualizarDatos(row, modalContent: TemplateRef<any>) {
    this.idPersona = row.id;
    this.modalService.open(modalContent);
    this.formularioPersona = this.formBuilder.group({
      name: row.name,
      lastname: row.lastname,
      direccion: row.direccion,
      age: row.age,
    });
  }

  actualizar(form) {
    if (form.status === 'VALID') {
      const model = {
        id: this.idPersona,
        name: form.value.name,
        lastname: form.value.lastname,
        direccion: form.value.direccion,
        age: form.value.age,
      };
      /*crear user*/
      this.personaService.actualizar(model) // llamar funcion desde servicio
        .then(result => {
          this.obtenerDatos();/*actualiza la tabla*/
          this.modalService.dismissAll();/*cerrar el modal*/
          this.resetFormulario();/*vaciar formulario*/
          Swal.fire(
            'Guardado!',
            'Se creo correcto',
            'success'
          );/*mesaje popup*/
        }).catch(err => {
        console.log(err, 'error');
      });
    } else {
      console.log('validar campos')
    }
  }

  eliminarDatos(row) {
    this.idPersona = row.id
    this.personaService.eliminar({id: this.idPersona}).then(result => {
      this.obtenerDatos();
    }).catch(err => {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      }
    );
  }

  openModal(modalContent: TemplateRef<any>) {
    this.resetFormulario();
    this.modalService.open(modalContent);
  }

}
