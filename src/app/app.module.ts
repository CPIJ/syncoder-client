import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';

import { routes } from './app.routes';
import { RegisterComponent } from './component/register/register.component';
import { Http } from '@angular/http';
import { HomeComponent } from './component/home/home.component';
import { ProjectTemplateComponent } from './component/project-template/project-template.component';
import { HeaderComponent } from './component/header/header.component';
import { LiveProjectComponent } from './component/live-project/live-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProjectTemplateComponent,
    HeaderComponent,
    LiveProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
