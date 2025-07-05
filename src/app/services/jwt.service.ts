import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  getDecodedToken(): any {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.name || 'User';
  }

  getUserRole(): string {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken?.groups) return '';
    
    // Get the first role from groups array
    const roles = decodedToken.groups.filter((role: string) => 
      role !== 'default-roles-spring-auth' && 
      role !== 'offline_access' && 
      role !== 'uma_authorization'
    );
    
    return roles[0] || '';
  }
} 