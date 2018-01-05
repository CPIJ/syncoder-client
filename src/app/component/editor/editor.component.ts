import { Component, OnInit, HostListener } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalContext } from '../../ultillity/local-context';
import { Project } from '../../model/project';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  project: Project = new Project();
  previousProject: Project = new Project();

  constructor(private stomp: StompService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.project) {
        this.project.id = params.project
      } else {
        this.router.navigate(['home']);
      }
    })


    this.stomp.configure({
      host: environment.host + '/syncoder',
      queue: ''
    });

    this.stomp.startConnect()
      .then(() => this.configureSubscriptions())
      .then(() => {
        this.stomp.send("/syncoder/project/onOpened", {
          clientId: LocalContext.loggedInClient.id,
          projectId: this.project.id,
          email: LocalContext.loggedInClient.account.email
        })
      })
  }

  onChange(code) {
    if (this.project.content != this.previousProject.content) {
      this.stomp.send("/syncoder/project/change/" + this.project.id, {
        id: this.project.id,
        content: code
      })
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.stomp.send("/syncoder/project/onClosed", { clientId: LocalContext.loggedInClient.id, projectId: this.project.id });
  }

  configureSubscriptions() {
    this.stomp.subscribe('/topic/project/onClientCountChange/' + this.project.id, (data) => {
      this.project.content = data.content;
    })

    this.stomp.subscribe('/topic/project/onchange/' + this.project.id, (project: Project) => {
      this.previousProject.content = this.project.content;
      this.project.content = project.content;
    })
  }
}
