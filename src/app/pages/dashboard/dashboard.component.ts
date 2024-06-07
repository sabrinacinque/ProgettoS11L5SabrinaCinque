import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';
import { iMovie } from '../../Models/i-movie';
import { MovieService } from '../../movie.service';
import { iMoviePreferiti } from '../../Models/i-movie-preferiti';
import { MoviePreferitoService } from '../../movie-preferito.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: iUser;
  users: iUser[] = [];
  movies: iMovie[] = [];
  favorites: iMoviePreferiti[] = [];

  constructor(
    private authSvc: AuthService,
    private movieSvc: MovieService,
    private moviePreferitoSvc: MoviePreferitoService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loadUsers();
        this.loadFavorites();
      }
    });

    this.movieSvc.getAll().subscribe(movies => {
      this.movies = movies;
    });
  }

  loadUsers() {
    this.authSvc.getAllUsers().subscribe(users => {
      // voglio che si veda la lista degli utenti , senza però mostrare l'utente che sta in quel momento loggato (non avrebbe senso fargli vedere se stesso)
      this.users = users.filter(u => u.id !== this.user.id);
    });
  }

  loadFavorites() {
    this.moviePreferitoSvc.getFavoriteByUserId(this.user.id).subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  addFavorite(movie: iMovie) {
    const favorite: Partial<iMoviePreferiti> = {
      userId: this.user.id,
      movie: movie
    };
    this.moviePreferitoSvc.addFavorite(favorite).subscribe(newFavorite => {
      this.favorites.push(newFavorite);
      window.alert(`${movie.title} è stato aggiunto ai preferiti!`);
    });
  }

  removeFavorite(movieId: number) {
    const favoriteToRemove = this.favorites.find(fav => fav.movie.id === movieId);
    if (favoriteToRemove && favoriteToRemove.id) {
      this.moviePreferitoSvc.removeFavorite(favoriteToRemove.id).subscribe(() => {
        this.favorites = this.favorites.filter(fav => fav.movie.id !== movieId);
      });
    }
  }

  isFavorite(movie: iMovie): boolean {
    return this.favorites.some(fav => fav.movie.id === movie.id);
  }
}
