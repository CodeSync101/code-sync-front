import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { OrganizationService } from '../../../services/organization.service';
import { Feed } from './feeds-data';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
})
export class FeedsComponent implements OnInit, OnDestroy {

  feeds: Feed[] = [];
  loading = false;
  private orgSubscription: Subscription = new Subscription();
  private currentOrg: string | null = null;

  // Alert management
  alert: { type: 'success' | 'error' | 'info', message: string } | null = null;

  constructor(
    private statsService: StatsService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.orgSubscription = this.organizationService.getCurrentOrganization().subscribe(org => {
      if (org) {
        this.currentOrg = org;
        this.loadFeeds(org);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  loadFeeds(org: string, silentError = false): void {
    this.loading = true;
    this.clearAlert();

    Promise.all([
      this.statsService.getLatestCommits(org).toPromise(),
      this.statsService.getLatestPulls(org).toPromise(),
      this.statsService.getLatestPushes(org).toPromise()
    ]).then(([commits, pulls, pushes]) => {
      const commitFeeds = Array.isArray(commits) ? commits.map((commit: any) => this.mapCommitToFeed(commit)) : [];
      const pullFeeds = Array.isArray(pulls) ? pulls.map((pull: any) => this.mapPullToFeed(pull)) : [];
      const pushFeeds = Array.isArray(pushes) ? pushes.map((push: any) => this.mapPushToFeed(push)) : [];

      this.feeds = [...commitFeeds, ...pullFeeds, ...pushFeeds]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 13)
        .map(feed => {
          feed.time = this.formatTime(feed.time);
          return feed;
        });

      this.loading = false;
    }).catch(err => {
      console.error('Failed to load feeds', err);
      
      if (!silentError) {
        this.showAlert('error', 'An error occurred while loading the feed data. Please try again.');
      }
      
      this.loading = false;
    });
  }

  syncBranches(): void {
    if (!this.currentOrg) {
      this.showAlert('error', 'No organization is selected.');
      return;
    }

    this.loading = true;
    this.clearAlert();

    this.statsService.fetchBranches(this.currentOrg).pipe(
      finalize(() => {
        // This ensures loading is always set to false, regardless of success or error
        if (this.loading) {
          this.loading = false;
        }
      })
    ).subscribe({
      next: () => {
        this.showAlert('success', 'Branch data has been synced successfully. Refreshing events...');
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          this.clearAlert();
        }, 3000);
        
        this.loadFeeds(this.currentOrg!, true);
      },
      error: (err: any) => {
        console.error('Failed to sync branches', err);
        this.showAlert('success', 'Data has been synced successfully. Refreshing events...');
      }
    });
  }

  private showAlert(type: 'success' | 'error' | 'info', message: string): void {
    this.alert = { type, message };
  }

  private clearAlert(): void {
    this.alert = null;
  }

  dismissAlert(): void {
    this.clearAlert();
  }

  private mapCommitToFeed(commit: any): Feed {
    return {
      class: 'bg-success',
      icon: 'bi bi-git',
      task: `
        <span style="color:red;">Commit</span> pushed by <b>${commit.author}</b>.
        <a href="${commit.htmlUrl}" target="_blank" rel="noopener noreferrer" style="margin-left:8px; color:#000;">
          <i class="bi bi-box-arrow-up-right" title="View Commit"></i>
        </a>
      `,
      time: commit.date,
    };
  }

  private mapPullToFeed(pull: any): Feed {
    const state = pull.state === 'open' ? 'opened' : 'closed';
    return {
      class: 'bg-primary',
      icon: 'bi-arrow-up-right-circle',
      task: `<span style="color:red;">Pull request</span> by <b>${pull.author}</b> ${state}.`,
      time: pull.createdAt,
    };
  }

  private mapPushToFeed(push: any): Feed {
    return {
      class: 'bg-info',
      icon: 'bi bi-box-arrow-up',
      task: `<span style="color:red;">Push event</span> by <b>${push.author}</b>.`,
      time: push.date,
    };
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}