import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  constructor(private http:HttpClient){}
  stats:any
  ngOnInit(): void {
    this.getStats()
  }


  getStats(){
   // this.http.get("http://localhost:8080/stats").subscribe({
    this.http.get("http://localhost:8082/task/api/stats").subscribe({  
   next:(res)=>{this.stats=res},
      error:(err)=>{console.log(err);
      }
    })
  }
}
