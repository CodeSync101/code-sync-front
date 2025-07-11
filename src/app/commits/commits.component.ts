import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit, OnDestroy {
  //this is for force push
  commits: any[] = [];
  loading = true;
  private orgSubscription: Subscription = new Subscription();

  constructor(
    private statsService: StatsService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {

    this.orgSubscription = this.organizationService.getCurrentOrganization().subscribe(org => {
      if (org) {
        this.loadLatestCommits(org);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  loadLatestCommits(organization: string): void {
    this.loading = true;
    this.commits = [];

    this.statsService.getLatestCommits(organization).subscribe({
      next: (data) => {
        this.commits = Array.isArray(data) ? data : [];
        this.loading = false;
        console.log('Commits loaded:', this.commits);
      },
      error: (err) => {
        console.error('Failed to load latest commits', err);
        this.loading = false;
      }
    });
  }
}

