import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promises",
  templateUrl: "./promises.component.html",
  styles: []
})
export class PromisesComponent implements OnInit {
  constructor() {
    let promesa = new Promise((resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          resolve();
          clearInterval(interval)
        }
      }, 1000);
    });

    promesa
      .then(() => console.log("Termino"))
      .catch(error => console.error("Error en la promesa"));
  }

  ngOnInit() {}
}
