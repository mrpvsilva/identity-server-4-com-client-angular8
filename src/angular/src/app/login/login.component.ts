import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
  }

  entrar() {
    this.oidcSecurityService.authorize();    
  }
}
