import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoriteJobsComponent } from './components/favorite-jobs/favorite-jobs.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

export const routes: Routes = [
    {path: "", component: JobListComponent},
    {path: "jobList", component: JobListComponent},
    {path: "favouriteJob", component: FavoriteJobsComponent},
    {path: "jobDetails", component: JobDetailsComponent}

];
