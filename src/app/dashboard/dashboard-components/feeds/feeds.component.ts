import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Feed } from './feeds-data';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {

  feeds: Feed[] = [];
  loading = false;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadFeeds();
  }

  loadFeeds(): void {
    this.loading = true;

    Promise.all([
      this.statsService.getLatestCommits().toPromise(),
      this.statsService.getLatestPulls().toPromise(),
      this.statsService.getLatestPushes().toPromise()
    ]).then(([commits, pulls, pushes]) => {

      const commitFeeds = commits.map((commit: any) => this.mapCommitToFeed(commit));
      const pullFeeds = pulls.map((pull: any) => this.mapPullToFeed(pull));
      const pushFeeds = pushes.map((push: any) => this.mapPushToFeed(push));

   this.feeds = [...commitFeeds, ...pullFeeds, ...pushFeeds]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0,13)
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
}
