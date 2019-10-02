import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  isAuthenticated: boolean;
  userData: any;

  constructor(public oidcSecurityService: OidcSecurityService,
    private router: Router) {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
  }



  ngOnInit() {
    this.oidcSecurityService
      .getIsAuthorized()
      .subscribe(auth => {
        if (auth) {
          this.router.navigate([''])
        } else {
          this.router.navigate(['login'])
        }
      });
  }
  private doCallbackLogicIfRequired() {
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }

}
