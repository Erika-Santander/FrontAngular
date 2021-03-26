import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsuarioCrudComponent} from './usuario-crud/usuario-crud.component';
import {UserRoutingModule} from './user-routing.module';
import { XyzComponent } from './xyz/xyz.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { PersonaComponent } from './persona/persona.component';
import { CargaArchivoComponent } from './carga-archivo/carga-archivo.component';

@NgModule({
  declarations: [
    UsuarioCrudComponent,
    XyzComponent,
    PersonaComponent,
    CargaArchivoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule
  ]
})

export class UserModule {
}
