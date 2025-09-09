import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from '../common/movies.service';
import { Movie } from '../common/movie.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  loading = false; 
  movie: Movie | null = null; 
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (!idParam) {
        this.movie = null;
        this.errorMessage = 'Film introuvable.';
        return;
      }
      const id = Number(idParam);
      this.fetchMovie(id);
    });
  }

  fetchMovie(id: number): void {
    this.loading = true;
    this.movie = null;
    this.errorMessage = null;

    // this.movie.getMovie(id).subscribe({
    //   next: (m) => {
    //     this.movie = m;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.errorMessage = 'Film introuvable.';
    //     this.loading = false;
    //   }
    // });
  }
}