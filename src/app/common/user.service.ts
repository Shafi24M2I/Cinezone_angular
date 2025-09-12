import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user et user 
   user: User | null = null;
  //  mon base de donnes 
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient ) {}
  // cette function j'ai fait pour quand je fais refreshProfile ca va me mettre mon profile si non l'ereur

  refreshProfile(): void {
    this.http.get<User>(`${this.baseUrl}/profile`, {withCredentials : true}).subscribe({
      next: (u) => {
        this.user = u;
      },
      error: () =>{
        this.user = null;
      },
    });
  }


  // creatUser avec name , email , password observable de user 
  createUser( name: string, email: string, password: string): Observable<User> {
    // return http// Crée un nouvel utilisateur via une requête POST
    return this.http
      .post<User>(
        `${this.baseUrl}/users`,
        {
          name: name , 
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap({
          next: (u) => {
            this.user = u;
          },
          error: () => {
            this.user = null;
          },
        })
      );
  }

  // pour la login on a besoin du cette methode 
  login(email: string, password: string): Observable<User> {
    
    return this.http
      .post<User>(
        `${this.baseUrl}/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap({
          next: (u) => {
            this.user = u;
          },
          error: () => {
            this.user = null;
          },
        })
      );
  }

  profile(): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/profile`, { withCredentials: true });
}
  logout(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/logout`, { withCredentials: true }).pipe(
      tap({
        next: () => {
          this.user = null;
        },
      })
    );
  }
}