import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/client';

@Component({
  selector: 'live-project',
  templateUrl: './live-project.component.html',
  styleUrls: ['./live-project.component.css']
})
export class LiveProjectComponent implements OnInit {

  @Input() id: string;
  @Input() clients: Client[]

  constructor() { }

  ngOnInit() {
    
  }

}
