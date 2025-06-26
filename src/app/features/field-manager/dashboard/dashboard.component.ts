import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  managedOrganizations: Organization[] = [];

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.managedOrganizations = user.managedOrganizations || [];
    });
  }
}
