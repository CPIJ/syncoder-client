import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Inject, Injectable, Component } from "@angular/core";
import { AuthenticationService } from "../service/authentication-service.service";
import { LocalContext } from "../ultillity/local-context";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (LocalContext.loggedInClient) {
            return this.authService.isAuthorized(LocalContext.loggedInClient);
        } else {
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
