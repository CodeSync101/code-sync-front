import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: any[] = [];
   token ="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";

  org_name:string="CodeSync101"
//sync_url=`http://localhost:8080/sync-org?org=${this.org_name}&token=${this.token}`
sync_url=`http://localhost:8082/task/api/sync-org?org=${this.org_name}&token=${this.token}`  

constructor(private repoService: RepositoryService ,private http:HttpClient ,private route:Router) {}

  ngOnInit() {
   this.sync()
    this.repoService.getAllRepositories().subscribe({
      next: (data) => {this.repositories = data;console.log(data);
      },
      error: (err: any) => console.error('Erreur lors du chargement des repos', err)
    });
  }


  sync(){
    let data=""
    this.http.post(this.sync_url,data,{responseType:'text'}).subscribe({
      next:(data)=>{console.log(data);
      },
      error:(err)=>{console.log(err);
      }
    })
  }


  nav(){
    this.route.navigate(['stats'])
  }
}


