import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
/*importamos los servicions */
import {UserService} from '../../../_services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css'],
  providers: [UserService]
})
export class UsuarioCrudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private modalService: NgbModal,
  ) {
  }

  source = {
    count: 10,
    rows: []
  };
  idUser;
  formularioUsuario: FormGroup;

  ngOnInit(): void {
    this.obtenerDatos();
    this.resetFormulario();
  }

  resetFormulario() {
    this.formularioUsuario = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      edad: [''],
      fechaNacimiento: [''],
      estado: ['', [Validators.required]],
    });
  }

  async obtenerDatos() {
    this.userService.obtener().then((result: any[]) => {
      this.source.rows = result;
    }).catch(err => {
      console.log(err, 'error');
    });
  }

  get form() {
    return this.formularioUsuario.controls;
  }

  /*funcion crear*/
  creando(formulario) {
    if (formulario.status === 'VALID') {
      const model = {
        nombreCompleto: formulario.value.nombreCompleto,
        username: formulario.value.username,
        password: formulario.value.password,
        edad: formulario.value.edad,
        fechaNacimiento: formulario.value.fechaNacimiento,
        estado: formulario.value.estado,
      };
      /*crear user*/
      this.userService.crear(model) // llamar funcion desde servicio
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
          'errer',
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
    this.idUser = row.id;
    this.modalService.open(modalContent);
    this.formularioUsuario = this.formBuilder.group({
      nombreCompleto: row.nombreCompleto,
      username: row.username,
      password: row.password,
      edad: row.edad,
      fechaNacimiento: row.fechaNacimiento,
      estado: row.estado,
    });
  }

  actualizar(form) {
    if (form.status === 'VALID') {
      const model = {
        id: this.idUser,
        nombreCompleto: form.value.nombreCompleto,
        username: form.value.username,
        password: form.value.password,
        edad: form.value.edad,
        fechaNacimiento: form.value.fechaNacimiento,
        estado: form.value.estado,
      };
      /*crear user*/
      this.userService.actualizar(model) // llamar funcion desde servicio
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
    this.idUser = row.id
    this.userService.eliminar({id: this.idUser}).then(result => {
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
