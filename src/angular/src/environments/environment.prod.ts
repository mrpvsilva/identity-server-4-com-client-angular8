export const environment = {
  production: true,
  oidcConfig: {
    'stsServer': 'https://localhost:44310',
    'redirectUrl': 'http://localhost:4200/callback',
    'postLogoutRedirectUri': 'http://localhost:4200/login',
    'clientId': 'angular',
    'responseType': 'code',
    'scope': 'openid profile',
    'startCheckSession': true,
    'silentRenew': true,
    'silentRenewUrl': 'http://localhost:4200/silent-renew.html',
    'postLoginRoute': '/callback',
    'maxIdTokenIatOffsetAllowedInSeconds': 10
  }
};
