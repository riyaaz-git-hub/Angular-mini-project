import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
} 

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent implements OnInit {
  noFavJob: string | undefined;
  isFavorite: boolean = false;

  constructor(private ServiceService: ServiceService,
    private router: Router){}
    jobList: JobData[] = [];

  ngOnInit(): void {
    if(this.ServiceService.favouriteJob.length !== 0) {
      this.isFavorite = true;
      this.jobList = this.ServiceService.favouriteJob;
    } else {
      this.isFavorite = false;
      this.noFavJob = 'No favorite selected'
    }
  }

  onJobDetail(selectedJob: JobData) {
    this.ServiceService.shareSelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
