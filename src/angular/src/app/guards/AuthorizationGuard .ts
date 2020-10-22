import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private router: Router, private oidcSecurityService: OidcSecurityService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log("canActivate", state);
        return this.checkUser(state);
    }

    private checkUser(state: RouterStateSnapshot): Observable<boolean> {
        return this.oidcSecurityService
            .isAuthenticated$
            .pipe(
                map((isAuthorized: boolean) => {

                    if (!isAuthorized) {
                        this.router.navigate(['login']);
                        return false;
                    }

                    return true;
                })
            );
    }
}