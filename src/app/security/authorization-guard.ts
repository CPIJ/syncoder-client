import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlSegment } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Inject, Injectable, Component } from "@angular/core";
import { AuthenticationService } from "../service/authentication-service.service";
import { LocalContext } from "../ultillity/local-context";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (LocalContext.loggedInClient) {
            if (this.authService.isAuthorized(LocalContext.loggedInClient)) {
                if (route.url.map(p => p.path.includes('admin'))[0]) {
                    return LocalContext.loggedInClient.account.isAdmin;
                }

                return true;
            }
        } else {
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
