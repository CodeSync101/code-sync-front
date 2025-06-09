// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { keycloak } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  authenticated = false;

  ngOnInit(): void {
    keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' })
      .then((authenticated: boolean) => {
        this.authenticated = authenticated;
        console.log('User is authenticated:', authenticated);

        // Save token in memory or localStorage
        if (authenticated) {
          localStorage.setItem('access_token', keycloak.token!);

          // Refresh token periodically
          setInterval(() => {
            keycloak.updateToken(30).then((refreshed: boolean) => {
              if (refreshed) {
                localStorage.setItem('access_token', keycloak.token!);
                console.log('Token refreshed');
              }
            }).catch(() => {
              console.error('Failed to refresh token');
            });
          }, 60000); // Refresh every 60 seconds
        }
      })
      .catch(() => {
        console.error('Authentication failed');
      });
  }

  logout() {
    keycloak.logout({
      redirectUri: 'http://localhost:4200'
    });
  }

  getToken(): string | undefined {
    return keycloak.token;
  }
}