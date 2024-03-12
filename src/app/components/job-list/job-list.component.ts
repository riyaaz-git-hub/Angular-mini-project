import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service'
import { catchError } from 'rxjs';


export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent implements OnInit {
  http = inject(HttpClient)
  jobList: JobData[] = [];
  isSelected: boolean = false;
  error: string = "data not loading";
  constructor(private ServiceService: ServiceService, private router: Router){}

  ngOnInit(): void{
    if (this.ServiceService.selectedJobArray.length != 0) {
      this.jobList = this.ServiceService.DuplicateJobList;
    } else {
      this.featchJobList();
    }
  }

  featchJobList() {
    this.ServiceService.featch().subscribe(data => {
      this.jobList = data;
      this.ServiceService.DuplicateJobList = this.jobList;
    })
    }

  favoriteMarked(job: JobData) {
      const item = this.jobList.filter(x => x.id === job.id);
      if(item[0].isSelectedFav){
        item[0].isSelectedFav = false;
      } else {
        item[0].isSelectedFav = true;
      }
      this.onSelectJob(job);
    }

  onSelectJob(job: JobData) {
    if(this.ServiceService.selectedJobArray.length === 0) {
      this.ServiceService.selectedJobArray.push(job);
      this.ServiceService.duplicateArray = this.ServiceService.selectedJobArray;
      this.ServiceService.favouriteJob = this.ServiceService.selectedJobArray;
    } 
    else {
      for(let i = 0; i < this.ServiceService.selectedJobArray.length ; i++){
          if(this.ServiceService.selectedJobArray.find(x => x.id === job.id) === undefined) {
            this.ServiceService.duplicateArray.push(job);
            break;
          } else {
            this.ServiceService.duplicateArray.forEach((item, index) => {
              if(item.id === job.id) {
                this.ServiceService.duplicateArray.splice(index, 1);
              }
            });
            break;
          }
        }
        this.ServiceService.selectedJobArray = this.ServiceService.duplicateArray;
        this.ServiceService.favouriteJob = this.ServiceService.selectedJobArray;
      }
  }


  onJobDetail(selectedJob: JobData) {
    debugger;
    this.ServiceService.shareSelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }

}
