import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { OrganizationService } from 'src/app/services/organization.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      // You can now use this.user.roles, this.user.groups, etc. for UI logic
    });
  }
}
