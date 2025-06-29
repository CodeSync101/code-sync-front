// commits.component.ts (Corrected with Static Data)

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Feed } from './feeds-data';
// We don't need these services for the static data test, but we'll leave them for later
import { StatsService } from '../services/stats.service';
import { OrganizationService } from 'src/app/services/organization.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit, OnDestroy {

  feeds: Feed[] = [];
  loading = false;
  // We keep the subscription variable even though it's not used in this version
  private orgSubscription: Subscription = new Subscription();

  // constructor(
  //   // private statsService: StatsService,
  //   // private organizationService: OrganizationService
  // ) {}

  constructor(private router: Router) {}

  ngOnInit(): void {
    // We call the new static method on initialization
    this.loadStaticFeeds();
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  // ============================
  // --- NEW STATIC DATA METHOD ---
  // ============================
  loadStaticFeeds(): void {
    console.log('[CommitsComponent] Loading STATIC feeds...');
    this.loading = true;

    // This is the hardcoded data you provided.
    // I have mapped it to look like 'commit' events for simplicity.
    const staticCommits = [
      { author: 'Farah-Saad1', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/6c0d213af2c3a8e0a1153789c1c9e8bd17f62dbc', date: '2025-06-13T12:53:35Z' },
      { author: 'badisjl99', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/6180bfc1f4bb15603958811244baa40a78f6bb93', date: '2025-06-08T14:00:44Z' },
      { author: 'scriptsl0th', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/13c012ecf973e62bcad035a4ce129faa6ac91a34', date: '2025-05-30T11:14:16Z' },
      { author: 'badisjl99', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/22f165b0ef753a9eb0ee490fa504333d4370470e', date: '2025-05-29T22:07:49Z' },
      { author: 'FetenDridi', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/7f65f7408a771787544594d86f8f399796db6a0e', date: '2025-05-29T11:49:45Z' },
      { author: 'scriptsl0th', htmlUrl: 'https://github.com/CodeSync101/Sync-101/commit/ed0a392d0eecc59f9a83c891622494a0769e123c', date: '2025-05-27T22:20:47Z' },
      { author: 'scriptsl0th', htmlUrl: 'https://github.com/CodeSync101/docker/commit/b818132b99e078a2c3ef9619d6a01a2514facbbf', date: '2025-05-23T14:07:40Z' },
      // I have added a pull request and a push event for variety
      { type: 'pull', author: 'badisjl99', state: 'open', createdAt: '2025-06-12T10:00:00Z' },
      { type: 'push', author: 'FetenDridi', date: '2025-06-11T18:30:00Z' }
    ];

    // Map the static data into the Feed format
    const allFeeds = staticCommits.map((item: any) => {
      if (item.type === 'pull') {
        return this.mapPullToFeed(item);
      } else if (item.type === 'push') {
        return this.mapPushToFeed(item);
      } else {
        return this.mapCommitToFeed(item);
      }
    });

    // Sort, slice, and format the time, just like your old code
    this.feeds = allFeeds
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 13)
      .map(feed => {
        feed.time = this.formatTime(feed.time);
        return feed;
      });

    this.loading = false;
    console.log('[CommitsComponent] Static feeds loaded successfully:', this.feeds);
  }


  // ===================================
  // --- OLD CODE (COMMENTED OUT) ---
  // ===================================
  /*
  loadFeeds(org: string): void {
    this.loading = true;
    console.log('Loading feeds for org:', org);

    Promise.all([
      this.statsService.getLatestCommits(org).toPromise(),
      this.statsService.getLatestPulls().toPromise(),
      this.statsService.getLatestPushes(org).toPromise()
    ]).then(([commits, pulls, pushes]) => {
      const commitFeeds = Array.isArray(commits) ? commits.map((commit: any) => this.mapCommitToFeed(commit)) : [];
      const pullFeeds = pulls.map((pull: any) => this.mapPullToFeed(pull));
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
      this.loading = false;
    });
  }
  */

  // --- MAPPING AND FORMATTING FUNCTIONS (No changes needed here) ---
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
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }

  actioncommits(id: any): void {
    this.router.navigateByUrl('/commits');
  }
}
