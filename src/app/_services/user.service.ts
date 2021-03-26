import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEnvironment} from '../_apiConfig/api.config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  urlPadre = 'usuario';

  constructor(private http: HttpClient) {
  }

  /*la url principal es la de apiConfig*/
  crear(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlPadre}/insertarRegistro`, model).toPromise();
  }

  obtener() {
    return this.http.get(`${apiEnvironment.url}/${this.urlPadre}/encuentraTodo`).toPromise();
  }

  actualizar(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlPadre}/actualizaDatos`, model).toPromise();
  }

  eliminar(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlPadre}/eliminarDatos`, model).toPromise();
  }
}
