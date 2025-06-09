import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any = {
    name: '',
    email: '',
    role: '',
    givenName: '',
    familyName: '',
    emailVerified: false
  };

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    const decodedToken = this.jwtService.getDecodedToken();
    if (decodedToken) {
      this.userInfo = {
        name: decodedToken.name || '',
        email: decodedToken.email || '',
        role: this.jwtService.getUserRole(),
        givenName: decodedToken.given_name || '',
        familyName: decodedToken.family_name || '',
        emailVerified: decodedToken.email_verified || false
      };
    }
  }
}
