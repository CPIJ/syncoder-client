import { Component, OnInit } from '@angular/core';
import { Template } from '../../model/template';
import { ProjectService } from '../../service/project.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [ProjectService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  templates: Template[];

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.service
      .getAllTemplates()
      .subscribe(
      templates => this.templates = templates,
      error => console.warn(error)
      );
  }
}
