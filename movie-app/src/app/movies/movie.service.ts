import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
movies: Movie[] = [];
movieListChangedEvent = new Subject<Movie[]>;
maxId: number;
currentId: number;
maxMovieId: number;

  constructor(private httpClient: HttpClient) {}
   getMovies(): Movie[]{
    this.httpClient.get('http://localhost:3000/movies')
    .subscribe ({
      next: (movies: any) => {
        this.movies = movies.movies
        this.maxMovieId = this.getMaxId()
        let list = this.movies.sort();
        this.movieListChangedEvent.next(list)
      },
      error: (e) => console.log(e.message),
    });
    return this.movies;
   }
   getMovie(id: string): Movie {
    for (let i = 0; i < this.movies.length; i++) {
      if(this.movies[i].id == id){
        return this.movies[i];
      }
      
    }
    return null;
   } 
   deleteMovie(movie: Movie) {
    if (!movie) {
      return;
    }
    const pos = this.movies.findIndex(d => d.id === movie.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.httpClient.delete('http://localhost:3000/movies/' + movie.id)
      .subscribe(
        (response: any) => {
          this.movies.splice(pos, 1);
          this.storeMovies(this.movies);
        }
      );
  }
 getMaxId(): number {
  this.maxId = 0;
  this.movies.forEach(movie => {
    this.currentId = parseFloat(movie.id)
    if (this.currentId > this.maxId){
      this.maxId = this.currentId;
    }
  });
  return this.maxId;
}
addMovie(movie: Movie) {
  if (!movie) {
    return;
  }
  movie.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  // add to database
  console.log("addmovie")
  this.httpClient.post<{ message: string, movie: Movie }>('http://localhost:3000/movies/',
    movie,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.movies.push(responseData.movie);
        this.storeMovies(this.movies);
      }
    );
}
updateMovie(originalMovie: Movie, newMovie: Movie) {
  if (!originalMovie || !newMovie) {
    return;
  }

  const pos = this.movies.findIndex(d => d.id === originalMovie.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newMovie.id = originalMovie.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.httpClient.put('http://localhost:3000/movies/' + originalMovie.id,
    newMovie, { headers: headers })
    .subscribe( 
      (response: any) => {
      this.movies[pos] = newMovie;
      this.storeMovies(this.movies);
    }
    );
}
storeMovies(movieList: any) {
  //const movieList = JSON.stringify(this.movies);
  this.httpClient.put('http://localhost:3000/movies', movieList,{ headers: new HttpHeaders({"Content-Type" : "application/json"})})
  .subscribe(response=>{
    let movieListClone = this.movies.slice()
    this.movieListChangedEvent.next(movieListClone)
  })
}
}