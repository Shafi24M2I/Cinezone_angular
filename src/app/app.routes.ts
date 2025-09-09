import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
   {
        path:"",
        component:HomeComponent
    },{
        path:"movies",
        component:MovielistComponent
    },{
        path:"movies/:id",
        component:MovieDetailComponent
    },
    { path: '**', redirectTo: '' },
];
