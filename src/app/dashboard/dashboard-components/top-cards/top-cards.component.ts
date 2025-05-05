import { Component, OnInit } from '@angular/core';
import { topcard } from './top-cards-data';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {
  topcards: topcard[] = [
    {
      bgcolor: 'success',
      icon: 'bi bi-bar-chart-line', // More representative of commits
      title: '...',
      subtitle: 'Total Commits'
    },
    {
      bgcolor: 'danger',
      icon: 'bi bi-journal-code', // More suited to represent repositories
      title: '...',
      subtitle: 'Total Repositories'
    },
    {
      bgcolor: 'warning',
      icon: 'bi bi-git', 
      title: '...',
      subtitle: 'Total Active Branches'
    },
    {
      bgcolor: 'info',
      icon: 'bi bi-people-fill', 
      title: '...',
      subtitle: 'Collaborators'
    }
  ];
  

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getTotalCommits().subscribe(res => {
      this.topcards[0].title = res.totalCommits?.toString() ?? '0';
    });
  
    this.statsService.getTotalBranches().subscribe(res => {
      this.topcards[2].title = res.distinctBranchCount?.toString() ?? '0';
    });
  }
  
}  