import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../../service.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface JobDetailsData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  location: string,
  industries: string,
  types: string,
  description: string,
  publishDate: string
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private ServiceService: ServiceService,
    private router: Router){}
  http = inject(HttpClient)
  jobDetails!: JobDetailsData;

onBackClick() {
  this.router.navigate(['/jobList']);
}

  ngOnInit(): void {
    const jobId = this.ServiceService.shareSelectedJob.id;
    this.featchJobDetails(jobId);
  }

    featchJobDetails(id: number) {
    const url = `${'/jobs'}/${id}`;
     this.http.get<JobDetailsData>(url).subscribe((respdata => {
      this.jobDetails = respdata;
    }))
  }

}
