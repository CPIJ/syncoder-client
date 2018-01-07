import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule  } from 'angular-font-awesome';

import { StompService } from 'ng2-stomp-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';

import { routes } from './app.routes';
import { RegisterComponent } from './component/register/register.component';
import { Http } from '@angular/http';
import { HomeComponent } from './component/home/home.component';
import { ProjectTemplateComponent } from './component/project-template/project-template.component';
import { HeaderComponent } from './component/header/header.component';
import { EditorComponent } from './component/editor/editor.component';
import { AceEditorComponent } from 'ng2-ace-editor';
import { AuthorizationGuard } from './security/authorization-guard';
import { AuthenticationService } from './service/authentication-service.service';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProjectTemplateComponent,
    HeaderComponent,
    EditorComponent,
    AceEditorComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule
  ],
  providers: [StompService, AuthorizationGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
