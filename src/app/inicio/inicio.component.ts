import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,FormGroup,Validators } from "@angular/forms"
import { Nota } from './nota';
import { NotasService } from "../notas.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  screen = 1;
  titulo:AbstractControl;
  estado:AbstractControl;
  descripcion:AbstractControl;

  array1:Array<Nota>=[];

  iniciadas:Array<Nota>=[];
  enProceso:Array<Nota>=[];
  cerradas:Array<Nota>=[];

  form:FormGroup;
  constructor(public fb: FormBuilder, private servicio:NotasService) {
    this.form= this.fb.group({
      titulo:["",[Validators.required]],
      estado:["",[Validators.required]],
      descripcion:["",[Validators.required]]
    });

    this.titulo = this.form.controls["titulo"];
    this.estado = this.form.controls["estado"];
    this.descripcion = this.form.controls["descripcion"];
   }

  ngOnInit(): void {
    this.servicio.cargar().subscribe(datos=>{
      this.iniciadas=datos[0];
      this.enProceso=datos[1];
      this.cerradas=datos[2];
    });
  }

  cargar(){
    this.servicio.cargar().subscribe(datos=>{
      this.iniciadas=datos[0];
      this.enProceso=datos[1];
      this.cerradas=datos[2];
    });
  }
  nueva(){
    this.screen=0;
    this.titulo.setValue("");
    this.descripcion.setValue("");
    this.estado.setValue("Selected");
  }

  enviar(){
    let lista:Array<Nota>=[{
      titulo:this.form.get("titulo")?.value,
      estado:this.form.get("estado")?.value,
      descripcion:this.form.get("descripcion")?.value
      }
    ];
    this.servicio.guardar(lista).subscribe(datos=>{
      
    });
    this.cargar();
    this.screen=1;
  }
  
  eliminar(nota:Nota){

  }

  actualizar(nota:Nota){
    let aux = nota.estado;
    this.screen=2;

    this.titulo.setValue(nota.titulo);
    this.estado.setValue(nota.estado);
    this.descripcion.setValue(nota.descripcion);
  }

}
