import { Component, OnInit } from '@angular/core';
import { SerieService } from '../../servicios/serie.service';
import { NgForm } from '@angular/forms';
import { Serie } from '../../modelos/serie';

declare var M: any;                               //declaro una variable M para que no tome ningun dato de TypeScript sino que tome datos
                                                  //de la biblioteca de Materialize

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [SerieService]                       //instanciar el servicio
})
export class SeriesComponent implements OnInit {

  constructor(private elServicio: SerieService) { }

  ngOnInit() {
    this.getSeries();                             //ni bien carga la aplicación que me traiga los objetos
  }

  addSerie(form: NgForm){                         //recibo un form del tipo NgForm
    if(form.value._id){                           //si existe un id es que quiero editar, sino quiero dar un alta
      this.elServicio.putSerie(form.value)
      .subscribe(res =>{
        this.resetForm(form);
        M.toast({html: 'Usuario actualizado ok'});
        this.getSeries();
      })
    } else {                                      //no existe el id, o sea dar un alta 
      this.elServicio.postSerie(form.value)
        .subscribe(res => {                       //subscribe porque quiero escuchar la respuesta del servidor
          this.resetForm(form);
          M.toast({html: 'Usuario guardado ok'}); //enviar mensajes de Materialize: Toast
          this.getSeries();
        });
    }
  }

  resetForm(form?: NgForm){                       //al decirle que el parametro es del tipo "NgForm" de la libreria NgForms de @angular/forms 
                                                  //ver arriba en la zona de imports
    if(form){
      form.reset();
      this.elServicio.selectedSerie = new Serie();
    }
  }


  getSeries(){                                    //
    this.elServicio.getSeries()                   //trae el listado del rest api
    .subscribe(res => {                           //subscribe para escuchar la respuesta de todos los objetos
      this.elServicio.series = res as Serie[];    
      console.log(res);
    });
  }


  editSerie(serie: Serie){
    this.elServicio.selectedSerie = serie;        //objeto seleccionado en el formulario
  }

  deleteSerie(_id: string){                       //
    if(confirm('Esta seguro?...')){
      this.elServicio.deleteSerie(_id)            //
      .subscribe(res =>{                          //
        this.getSeries();                         //
        M.toast({html: 'Usuario borrado Ok'});    //
      })
    }
   
  }
}
