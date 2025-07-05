import { Component, OnInit } from '@angular/core';
import { RapportService } from './rapport.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent implements OnInit {
  students: string[] = [];
  selectedStudents: string[] = [];
  selectedSections: string[] = [];
  reportPreview: string = '';

  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private rapportService: RapportService) {
    this.startDate.setMonth(this.startDate.getMonth() - 1);
  }

  ngOnInit(): void {
    this.rapportService.getEtudiants().subscribe(data => {
      this.students = data;
    });
  }

  resetSelection(): void {
    this.selectedStudents = [];
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.selectedSections = [];
    this.reportPreview = '';
  }

  onSectionChange(section: string, event: any): void {
    if (event.target.checked) {
      if (!this.selectedSections.includes(section)) {
        this.selectedSections.push(section);
      }
    } else {
      this.selectedSections = this.selectedSections.filter(s => s !== section);
    }
  }

  onVisualize(): void {
    const start = this.startDate.toISOString().split('T')[0];
    const end = this.endDate.toISOString().split('T')[0];
    const students = this.selectedStudents.length > 0 ? this.selectedStudents.join(', ') : 'Tous les étudiants';
    const sections = this.selectedSections.length > 0 ? this.selectedSections.join(', ') : 'Aucune section sélectionnée';

    this.reportPreview = `Aperçu du rapport :\nPériode : ${start} - ${end}\nÉtudiants : ${students}\nSections : ${sections}`;
  }

  onDownload(): void {
    const start = formatDate(this.startDate, 'yyyy-MM-dd', 'en');
    const end = formatDate(this.endDate, 'yyyy-MM-dd', 'en');

    this.rapportService.downloadRapport(start, end, this.selectedStudents, this.selectedSections)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport_${start}_${end}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.reportPreview = `Rapport téléchargé : rapport_${start}_${end}.pdf`;
      }, error => {
        this.reportPreview = 'Erreur lors du téléchargement du rapport.';
      });
  }
}
