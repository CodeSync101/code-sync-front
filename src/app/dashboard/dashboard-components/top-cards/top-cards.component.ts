import { Component, OnInit } from '@angular/core';
import { topcard } from './top-cards-data'; // Ensure this is in your data file
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
})
export class TopCardsComponent implements OnInit {
  topcards: topcard[] = [
    {
      bgcolor: 'success',
      icon: 'bi bi-bar-chart-line', 
      title: '...',
      subtitle: 'Total Commits'
    },
    {
      bgcolor: 'danger',
      icon: 'bi bi-journal-code',
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
      subtitle: 'Total Active Collaborators'
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
    
    this.statsService.getActiveCollaboratorsCount().subscribe(res => {
      this.topcards[3].title = res.authorsCount?.toString() ?? '0'; 
    });
    
    this.statsService.getDistinctRepositories().subscribe(res => {
      this.topcards[1].title = res.repositoryCount?.toString() ?? '0'; // Update repository count
    });
  }
}
