import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEnvironment} from '../_apiConfig/api.config';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  urlP = 'persona';

  constructor(private http: HttpClient) {

  }

  agrega(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlP}/agregarDato`, model).toPromise();
  }

  obtener() {
    return this.http.get(`${apiEnvironment.url}/${this.urlP}/encontrarTodo`).toPromise();
  }
  actualizar(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlP}/actualizaDatos`, model).toPromise();
  }

  eliminar(model) {
    return this.http.post(`${apiEnvironment.url}/${this.urlP}/eliminarDatos`, model).toPromise();
  }
}
