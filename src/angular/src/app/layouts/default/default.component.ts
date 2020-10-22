import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
  }

  sair() {
    this.oidcSecurityService.logoff()
  }
}
