import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFromComponent } from './movie-from/movie-from.component';

export const routes: Routes = [
   {
        path:"",
        component:HomeComponent
    },{
        path:"movies",
        component:MovielistComponent
    },{
        path: "movies/add",
        component: MovieFromComponent
    },
    {
        path:"movies/:id",
        component:MovieDetailComponent
    },
    {
        path:"movies/:id/edit",
        component:MovieFromComponent
        
    },
    { path: '**', redirectTo: '' },
];
