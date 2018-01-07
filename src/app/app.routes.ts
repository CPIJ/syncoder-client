import { LoginComponent } from './component/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { EditorComponent } from './component/editor/editor.component';
import { AuthorizationGuard } from './security/authorization-guard';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthorizationGuard] },
    { path: 'edit', component: EditorComponent, canActivate: [AuthorizationGuard] },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthorizationGuard] }
];
