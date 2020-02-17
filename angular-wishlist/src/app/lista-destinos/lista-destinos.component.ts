// @ts-ignore
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from '../models/destino-viaje.model';
// @ts-ignore
import {DestinosApiClient} from '../models/destinos-api-client.model';
// @ts-ignore
import {DestinosApiClientModel} from '../models/destinos-api-client.model';

// @ts-ignore
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(private destinosApiClient: DestinosApiClientModel) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje) {
    this.destinosApiClient.elegir(e);
  }
}
