import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-top-repositories',
  templateUrl: './top-repositories.component.html',
  styleUrls: ['./top-repositories.component.scss']
})
export class TopRepositoriesComponent implements OnInit {

  repositories: Record<string, number> = {};
  loading = true;
 objectKeys = Object.keys;
  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getTopRepositoriesByCommitCount().subscribe({
      next: data => {
        this.repositories = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
