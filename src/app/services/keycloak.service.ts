import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private readonly keycloakLogoutUrl = 'http://localhost:8080/realms/codesync-auth/protocol/openid-connect/logout';

  constructor(private router: Router) {}

  logout() {
    // Get the ID token before clearing storage
    const idToken = localStorage.getItem('id_token');
    
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    
    // Get the current URL to use as redirect URI
    const redirectUri = encodeURIComponent(window.location.origin + '/authentication/login');
    
    // Redirect to Keycloak logout endpoint with id_token_hint
    const logoutUrl = `${this.keycloakLogoutUrl}?post_logout_redirect_uri=${redirectUri}${idToken ? `&id_token_hint=${idToken}` : ''}`;
    window.location.href = logoutUrl;
  }
}

export const keycloak: Keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'codesync-auth',
  clientId: 'codesync-front'
}); 