import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: string[] = [];

  constructor(private repoService: RepositoryService) {}

  ngOnInit() {
    this.repoService.getAllRepositories().subscribe({
      next: (data: string[]) => (this.repositories = data),
      error: (err: any) => console.error('Erreur lors du chargement des repos', err)
    });
  }
}
