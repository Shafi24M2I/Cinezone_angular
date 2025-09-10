import { Component } from '@angular/core';
import { MoviesService } from '../common/movies.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Movie } from '../common/movie.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-from',
  imports: [FormsModule , RouterLink],
  templateUrl: './movie-from.component.html',
  styleUrl: './movie-from.component.css'
})
export class MovieFromComponent {
  movie: Movie = {
  title: "",  
  director: "",
  rating: 0,
  release_year: 0,    
  category_id: 0,

};
isEditing: boolean = false;

constructor(
  private movieService : MoviesService,
  private toastr : ToastrService,
  private router : Router,
  private activatedRoute: ActivatedRoute
){}


ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (id) {
        this.isEditing = true;
        this.movieService.getMovie(id).subscribe({
          next: (movie) => {
            this.movie = movie;
          },
          error: () => {
            this.toastr.error("Impossible de récupérer l'article");
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
onSubmit(): void {
    if (this.movie.id) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }

createMovie(): void {
    this.movieService.createMovie(this.movie).subscribe({
      next: () => {
        this.toastr.success('Film bien ajouté');
        this.router.navigate(['movies']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erreur durant la création de l'article");
        this.router.navigate(['/']);
      }
    });
  }

updateMovie(): void {
    this.movieService.updateMovie(this.movie.id!, this.movie).subscribe({
      next: () => {
        this.toastr.success('Article bien modifié');
        this.router.navigate(['movies']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erreur durant la modification de l'article");
        this.router.navigate(['movies']);
      }
    });
  }
}
