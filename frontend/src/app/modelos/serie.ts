export class Serie {

    constructor(_id='', nombre='', apellido='', edad=0, usuario=''){    //el constructor lo necesito por si estoy creando un nuevo
        this._id = _id;                                                 //objeto y no hay nada aún
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.usuario = usuario;
    };

    _id: String;
    nombre : String;
    apellido : String;
    edad : Number;
    usuario : String;
}
