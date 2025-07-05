import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, GroupRepoDTO } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  teacherGroups: GroupRepoDTO[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.teacherGroups = user.teacherGroups || [];
    });
  }
}
