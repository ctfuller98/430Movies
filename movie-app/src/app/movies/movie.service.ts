import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { MOCKMOVIES } from './MOCKMOVIES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
movies: Movie[] = [];
movieListChangedEvent = new Subject<Document[]>();
  constructor() { 
    this.movies = MOCKMOVIES;
  }
  getMovies(): Movie[]{
    let list = this.movies.sort();
    return list.slice();
  }
  getOne(id: string): Movie {
    for (let i = 0; i < this.movies.length; i++) {
      if(this.movies[i].id == id){
        return this.movies[i];
      }
    }
    return null;
  } 
  
  /*deleteMovie(movie: Movie) {
    if (!movie) {
       return;
    }
    const pos = this.movies.indexOf(movie);
    if (pos < 0) {
       return;
    }
    this.movies.splice(pos, 1);
    this.storeDocuments()
 }*/
}