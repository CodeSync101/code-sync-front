// navigation.component.ts
import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtService } from '../../services/jwt.service';
import { RouterModule, Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloak.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public userName: string = '';
  public userRole: string = '';
  public organizations: string[] = [];
  public selectedOrganization: string = '';

  constructor(
    private modalService: NgbModal,
    private jwtService: JwtService,
    private keycloakService: KeycloakService,
    private router: Router,
    private organizationService: OrganizationService
  ) {
    this.loadUserInfo();
  }

  ngOnInit() {
    this.loadOrganizations();
    this.organizationService.getCurrentOrganization().subscribe(org => {
      this.selectedOrganization = org;
    });
  }

  private loadUserInfo() {
    this.userName = this.jwtService.getUserName();
    this.userRole = this.jwtService.getUserRole();
  }

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (orgs) => {
        this.organizations = orgs;
        if (orgs.length > 0 && !this.selectedOrganization) {
          this.selectOrganization(orgs[0]);
        }
      },
      error: (error) => console.error('Error loading organizations:', error)
    });
  }

  selectOrganization(org: string) {
    this.selectedOrganization = org;
    this.organizationService.setCurrentOrganization(org);
  }

  navigateToProfile() {
    this.router.navigate(['/component/profile']);
  }

  logout() {
    this.keycloakService.logout();
  }
  
  ngAfterViewInit() { }
}