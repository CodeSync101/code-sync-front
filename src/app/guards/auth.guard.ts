import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }

    // Redirect to login page if not authenticated
    this.router.navigate(['/authentication/login']);
    return false;
  }
} 