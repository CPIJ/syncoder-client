import { Component, Input } from '@angular/core';
import { Template } from '../../model/template';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent {

  @Input() id: string;
  @Input() content: string;

  constructor() { }
}
