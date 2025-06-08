// navigation.component.ts
import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  organizations: string[] = [];
  selectedOrganization: string = '';

  constructor(private organizationService: OrganizationService) {}

  ngOnInit() {
    this.loadOrganizations();
    this.organizationService.getCurrentOrganization().subscribe(org => {
      this.selectedOrganization = org;
    });
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
}