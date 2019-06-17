import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html"
})
export class IncrementadorComponent implements OnInit {
  @Input() porcentaje: number = 50;
  @Input() leyenda: string = "Leyenda";
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @ViewChild("txtvalor") txtporcentaje: ElementRef;
  constructor() {}

  ngOnInit() {}

  onChanges(event: number) {
    if (event >= 100) {
      this.porcentaje = 100;
    } else if (event <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = event;
    }
    this.txtporcentaje.nativeElement.value = Number(this.porcentaje);
    this.cambioValor.emit(this.porcentaje);
  }
  changevalue(value) {
    if (this.porcentaje >= 100) {
      return;
    }
    if (this.porcentaje <= 0) {
      return;
    }
    this.porcentaje += value;
    this.cambioValor.emit(this.porcentaje);
    this.txtporcentaje.nativeElement.focus();
  }
}
