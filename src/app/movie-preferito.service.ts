import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iMoviePreferiti } from './Models/i-movie-preferiti';

@Injectable({
  providedIn: 'root'
})
export class MoviePreferitoService {
  private apiUrl: string = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) { }

  // Ottieni tutti i film preferiti
  getFavorites(): Observable<iMoviePreferiti[]> {
    return this.http.get<iMoviePreferiti[]>(this.apiUrl);
  }

  // Ottieni i film preferiti per userId
  getFavoriteByUserId(userId: number): Observable<iMoviePreferiti[]> {
    return this.http.get<iMoviePreferiti[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Aggiungi un film ai preferiti
  addFavorite(movie: Partial<iMoviePreferiti>): Observable<iMoviePreferiti> {
    return this.http.post<iMoviePreferiti>(this.apiUrl, movie);
  }

  // Rimuovi un film dai preferiti
  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
