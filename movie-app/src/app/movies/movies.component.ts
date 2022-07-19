import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
 // @Input() selectedMovie: Movie;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

}
