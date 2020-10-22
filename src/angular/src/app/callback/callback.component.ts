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
  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate([''])
        } else {
          this.router.navigate(['login'])
        }
      });
  } 

}
