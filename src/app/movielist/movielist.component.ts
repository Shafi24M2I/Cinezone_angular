import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../common/movies.service';
import { Movie } from '../common/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
loading = true;
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService , private router:Router) {}

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
   goToDetail(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
