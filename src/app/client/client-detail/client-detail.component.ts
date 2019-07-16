import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../../models/Client.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {

  public dataClient: ClientModel;
  public backgroudColor = document.querySelector('.changeColor');
  constructor() { }

  ngOnInit() {
    this.backgroudColor.setAttribute('--background', `#${this.dataClient.color}`);
  }

  public getColorHeader(color: string) {
    return '#' + color;
  }

}
