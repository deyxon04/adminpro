import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit {
  constructor(private _http: HttpClient) {
    // let obs = new Observable(observer => {
    //   let contador = 1;
    //   let interval = setInterval(() => {
    //     contador += 1;
    //     observer.next(contador);
    //   }, 1000);
    // });
    // obs.subscribe((numero: number) => {
    //   console.log("Subs ", numero);
    // });
    this.getHeroes()
      .pipe(retry(2))
      .subscribe(
        resp => {
          console.log("Respo ", resp);
        },
        error => {
          console.log("Error", error);
        },
        () => {
          console.log("El observador termino");
        }
      );
  }
  ngOnInit() {}

  getHeroes() {
    return new Observable<any>(obs => {
      let contador = 0;
      let posts: any = {};
      let interval = setInterval(() => {
        contador += 1;
        if (contador === 1) {
          this._http
            .get("https://jsonplaceholder.typicode.com/posts")
            .subscribe((resp: any) => {
              posts = {
                id: resp[0].id,
                title: resp[0].title
              };
            });
        }
        if (contador === 2) {
          // clearInterval(interval);
          obs.error("Ayudame tengo un error");
        }
        if (contador == 3) {
          clearInterval(interval);
          obs.complete();
        }
      }, 2000);
      obs.next(posts);
    });
  }
}
