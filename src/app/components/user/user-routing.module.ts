import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioCrudComponent} from './usuario-crud/usuario-crud.component';
import {PersonaComponent} from './persona/persona.component';
import { XyzComponent } from './xyz/xyz.component';
import { CargaArchivoComponent } from './carga-archivo/carga-archivo.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioCrudComponent
  },
  {
    path: 'juan',
    component: XyzComponent
  },
  {
    path: 'personas',
    component: PersonaComponent
  },
  {
    path: 'carga',
    component: CargaArchivoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
