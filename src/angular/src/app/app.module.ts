import { AuthorizationGuard } from './guards/AuthorizationGuard ';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { CallbackComponent } from './callback/callback.component';

import { AuthModule, ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';


export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load(`${window.location.origin}/assets/auth.clientConfiguration.json`);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DefaultComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
  ],
  providers: [
    AuthorizationGuard,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {

      const { customConfig } = configResult;
      // Use the configResult to set the configurations      
      const config: OpenIdConfiguration = {
        stsServer: customConfig.stsServer,
        client_id: customConfig.client_id,
        scope: customConfig.scope,
        post_login_route: customConfig.post_login_route,
        post_logout_redirect_uri: customConfig.post_logout_redirect_uri,
        response_type: customConfig.response_type,        
        redirect_url: customConfig.redirect_url,
        silent_renew: customConfig.silent_renew,
        silent_renew_url: customConfig.silent_renew_url,
        log_console_debug_active: customConfig.log_console_debug_active
      };

      console.log("CONFIG", config);

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }

}
