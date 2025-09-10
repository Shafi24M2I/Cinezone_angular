// On importe HttpClient pour faire des requêtes HTTP vers l'API
import { HttpClient } from '@angular/common/http';

// On importe Injectable pour déclarer un service Angular
import { Injectable } from '@angular/core';

// On importe map (opérateur RxJS) pour transformer les données et Observable pour typer le retour
import { Observable } from 'rxjs';



// On importe l'interface Movie qui décrit la structure d'un film (ex: title, year)
import { Movie } from './movie.interface';


// Décorateur qui dit à Angular que ce service sera disponible partout (root injector)
@Injectable({
  providedIn: 'root'
})
export class MoviesService {   // On déclare notre service "MoviesService"

  // Base de l'URL de l'API (ici ton serveur Express tourne en local sur port 3000)
  private baseUrl = 'http://localhost:3000';

  // Constructeur qui injecte HttpClient (nécessaire pour faire des requêtes HTTP)
  constructor(private http: HttpClient ) {}

  // Méthode publique qui retourne un Observable de liste de films (Movie[])
  getMovies(): Observable<Movie[]> {
    // On fait un GET sur l'endpoint /movies et on typpe la réponse attendue : ApiResponse<Movie[]>
    return this.http
      .get<Movie[]>(`${this.baseUrl}/movies`)

  }
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/movies/${id}`, movie);
  }
  deleteMovie(id: number): Observable <void>{
    return this.http.delete<void>(`${this.baseUrl}/movies/${id}`)
  }
}