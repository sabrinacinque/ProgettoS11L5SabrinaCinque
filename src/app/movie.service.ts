import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMovie } from './Models/i-movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl:string = 'http://localhost:3000/movies-popular';

  constructor( private http:HttpClient) { }


  getAll(){
    return this.http.get<iMovie[]>(this.apiUrl)
  }



}
