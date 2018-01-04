import { LoginComponent } from "./component/login/login.component";
import { Routes } from '@angular/router'
import { RegisterComponent } from "./component/register/register.component";

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
]