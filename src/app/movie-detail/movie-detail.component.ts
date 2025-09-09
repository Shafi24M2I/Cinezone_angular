import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesService } from '../common/movies.service';
import { Movie } from '../common/movie.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  loading = false;
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private toastr: ToastrService, 
    private router: Router
  ) {}


  ngOnInit(): void {
    console.log('init article details');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (!id) {
        this.toastr.error('Identifiant invalide.');
        this.movie = null;
        return;
      }
      this.fetchMovie(id);
    });
  }

  fetchMovie(id: number): void {
    this.loading = true;
    // this.movie = null;
    this.moviesService.getMovie(id).subscribe({
      next: (m) => {
        this.movie = m;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Impossible de charger l’article.');
        this.loading = false;
      },
    });
  }
  goHome():void {
    this.router.navigate(['/movies']);
  }
}
