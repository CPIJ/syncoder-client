import { Component, OnInit } from '@angular/core';
import { Template } from '../../model/template';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  templates: Template[];

  constructor() { }

  ngOnInit() {
  }

}
