/*
En un servicio defino métodos que se pueden utilizar en cualquier parte de mi aplicación

*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';            // para permitir que el servicio se comunique con el servidor via http
                                                              // pero hay que cargar la libreria HttpClientModule en app.module.ts y
                                                              // ponerlo en la sección "Imports" de ese mismo archvo.
import { Serie } from '../modelos/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  selectedSerie: Serie;
  series: Serie[];
  //readonly URL_API = 'http://10.16.144.7:3000/api/usuarios/'; 
  readonly URL_API = '//localhost:3000/api/usuarios/';
  
  constructor(private http:HttpClient) {
    this.selectedSerie = new Serie();                         //hay que darle un empleado por defecto para que no sea indefinido cuando 
                                                              //empieza la aplicación, pero para que esto funcione hay que
                                                              //definir un constructor en la clase del modelo. Se usa una clase en lugar de
                                                              //una interface.  
   }

  getSeries(){
    return this.http.get(this.URL_API);
  }

  postSerie(SerieEnviar: Serie){
    return this.http.post(this.URL_API, SerieEnviar);
  }

  putSerie(SerieModificar){
    return this.http.put(this.URL_API + SerieModificar._id, SerieModificar);  
                                                              //estoy pasando el id del objeto a modif y luego el 
                                                              //propio objeto entero con los nuevos datos
  }

  deleteSerie(_id: string){
    return this.http.delete(this.URL_API + _id);
  }

}
