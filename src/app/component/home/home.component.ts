import { Component, OnInit } from '@angular/core';
import { Template } from '../../model/template';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';
import { LocalContext } from '../../ultillity/local-context';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [ProjectService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  templates: Template[] = []
  liveProjects: Project[] = []

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit() {
    this.service
      .getAllTemplates()
      .subscribe(
      templates => this.templates = templates,
      error => console.warn(error)
      );

    this.service
      .getLiveProjects()
      .subscribe(
      projects => this.liveProjects = projects,
      error => console.warn(error)
      );
  }

  joinProject(project) {
    this.router.navigate(['edit'], { queryParams: { project: project.id } })
    console.log(`${LocalContext.loggedInClient.account.username} wants to join ${project.id}`);
  }

  createProject() {
    console.log('create new project');
  }
}
