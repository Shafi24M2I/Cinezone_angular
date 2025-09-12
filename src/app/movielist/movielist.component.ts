import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../common/movies.service';
import { Movie } from '../common/movie.interface';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

 
@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  imports: [RouterLink , RouterModule]
 
})
export class MovielistComponent implements OnInit {
loading = true;
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService ,
    private toastr : ToastrService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // On appelle le service pour récupérer les films
    this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films', err);
        this.loading = false;
      },
    });
  }
  deleteMovie(id: number):void {
    if (confirm('confirmez vous la suppression ')){
      this.moviesService.deleteMovie(id).subscribe({
        next:() =>{
          this.toastr.success('La suppression a été effectuée');
           this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films', err);
        this.loading = false;
      },
    });
        },
        error: ()=> {
          this.toastr.error("erreur durant la suppression de la movie .");
        },
      });
    }
  }
}
