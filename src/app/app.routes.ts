import { LoginComponent } from './component/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { EditorComponent } from './component/editor/editor.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent },
    { path: 'edit', component: EditorComponent }
];
