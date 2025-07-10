import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-commit-frequency',
  templateUrl: './commit-frequency.component.html',
  styleUrls: ['./commit-frequency.component.scss']
})
export class CommitFrequencyComponent implements OnInit {
  commitFrequency: Record<string, number> = {};
  loading = true;
  objectKeys = Object.keys;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getCommitFrequencyByWeekday().subscribe({
      next: data => {
        this.commitFrequency = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get maxCommits(): number {
    return Math.max(...Object.values(this.commitFrequency));
  }
}
