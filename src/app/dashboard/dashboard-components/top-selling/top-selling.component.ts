import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Contributor } from './Contributor'; // or wherever your interface is defined

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {

  topContributors: Contributor[] = [];
  totalContributions: number = 0;
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadTopContributors();
  }

  loadTopContributors(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.statsService.getTopContributors().subscribe({
      next: (data) => {
        this.topContributors = data.topContributors;
        this.totalContributions = data.totalContributions;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading top contributors', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  /**
   * Extract initials from contributor name for avatar display
   * @param name - Full name of the contributor
   * @returns First two initials in uppercase
   */
  getInitials(name: string): string {
    if (!name || name.trim() === '') {
      return '??';
    }
    
    return name
      .trim()
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  /**
   * Calculate stroke-dasharray for circular progress ring
   * @param percentage - Percentage value (0-100)
   * @returns String for SVG stroke-dasharray attribute
   */
  getStrokeDashArray(percentage: number): string {
    const radius = 32; // Circle radius from CSS
    const circumference = 2 * Math.PI * radius;
    const strokeLength = Math.max(0, Math.min(100, percentage)) / 100 * circumference;
    
    return `${strokeLength.toFixed(2)} ${circumference.toFixed(2)}`;
  }

  /**
   * Get contribution percentage for a specific contributor
   * @param contributions - Number of contributions
   * @returns Percentage as number
   */
  getContributionPercentage(contributions: number): number {
    if (this.totalContributions === 0) {
      return 0;
    }
    return (contributions / this.totalContributions) * 100;
  }

  /**
   * Generate unique gradient ID for each contributor's progress ring
   * @param index - Index in the array
   * @returns Unique gradient ID string
   */
  getGradientId(index: number): string {
    return `gradient-${index}`;
  }

  /**
   * Get avatar background color based on contributor name
   * @param name - Contributor name
   * @returns CSS gradient string
   */
  getAvatarGradient(name: string): string {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    
    // Use name hash to consistently assign gradient
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  }

  /**
   * Retry loading contributors on error
   */
  retryLoad(): void {
    this.loadTopContributors();
  }

  /**
   * Track by function for ngFor optimization
   * @param index - Item index
   * @param contributor - Contributor object
   * @returns Unique identifier
   */
  trackByContributor(index: number, contributor: Contributor): any {
    return contributor.author || index;
  }
}