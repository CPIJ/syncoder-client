import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalContext } from '../../ultillity/local-context';
import { Project } from '../../model/project';
import { Client } from '../../model/client';
import {AceEditorModule} from 'ng2-ace-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.stomp.send("/syncoder/project/onClosed", { clientId: LocalContext.loggedInClient.id, projectId: this.projectId });
  }

  projectId: string;
  content: string;
  clients: Client[];
  previousContent: string;
  isTemplate: boolean;

  constructor(private stomp: StompService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.project) {
        this.projectId = params.project
      } else {
        this.router.navigate(['home']);
      }

      if (params.content) {
        this.content = params.content;
        this.isTemplate = true;
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
          projectId: this.projectId,
          email: LocalContext.loggedInClient.account.email
        })
      })
    
    }

  onChange(code) {
    if (this.content != this.previousContent) {
      this.previousContent = this.content;
      this.stomp.send("/syncoder/project/change/" + this.projectId, {
        id: this.projectId,
        content: code,
        clientId: LocalContext.loggedInClient.id
      })
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.stomp.send("/syncoder/project/onClosed", { clientId: LocalContext.loggedInClient.id, projectId: this.projectId });
  }

  configureSubscriptions() {
    this.stomp.subscribe('/topic/project/onClientCountChange/' + this.projectId, (response) => {
      if (response.sender === undefined || response.sender.id != LocalContext.loggedInClient.id) {
        this.clients = response.project.clients;
      }
    })

    this.stomp.subscribe('/topic/project/onchange/' + this.projectId, (response) => {
        this.content = response.project.content;
    })

    this.stomp.subscribe('/topic/project/onJoin/' + LocalContext.loggedInClient.id, (project: Project) => {
      if (!this.isTemplate) {
        this.content = project.content;
      } else {
        this.onChange(this.content)
      }

      if (project.clients.length >= 8) {
        this.router.navigate(['home']);
      }

      this.clients = project.clients;
    })
  }
}
