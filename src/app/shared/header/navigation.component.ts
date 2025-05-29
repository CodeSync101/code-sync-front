// navigation.component.ts
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { OrganizationService } from '../../services/organization.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public organizations: string[] = [];
  public selectedOrganization: string = '';

  constructor(
    private modalService: NgbModal,
    private orgService: OrganizationService
  ) {}

  ngAfterViewInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.orgService.getOrganizations().subscribe((data: string[]) => {
      this.organizations = data;
      // Set first organization as default if available
      if (data.length > 0) {
        this.selectedOrganization = data[0];
      }
    });
  }

  selectOrganization(org: string) {
    this.selectedOrganization = org;
  }


}